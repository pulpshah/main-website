import { NextResponse } from "next/server";
import neo4j from "neo4j-driver";
import { PostHog } from "posthog-node";

// Initialize PostHog client
const posthogClient = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
  }
);

// Interface for chat message data
interface ChatMessageData {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  previousMessageId?: string;
  distinctId?: string; // PostHog distinct ID for user identification
}

// Interface for Neo4j query parameters
interface Neo4jQueryParams {
  messageId: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  previousMessageId?: string;
  distinctId?: string; // PostHog distinct ID for user identification
}

// Storage function to connect to Neo4j and store chat messages
async function storeChatMessageInNeo4j(data: ChatMessageData) {
  // Get Neo4j connection details from environment variables
  const uri = process.env.NEO4J_URI || "";
  const username = process.env.NEO4J_USERNAME || "";
  const password = process.env.NEO4J_PASSWORD || "";
  
  // Return early if connection details are missing
  if (!uri || !username || !password) {
    console.warn('Neo4j connection details not found in environment variables');
    return { success: true, messageId: null };
  }
  
  let driver;
  let session;
  
  try {
    // Create a driver instance
    driver = neo4j.driver(
      uri,
      neo4j.auth.basic(username, password)
    );
    
    // Create a session
    session = driver.session();
    
    // Create timestamp
    const timestamp = new Date().toISOString();
    
    // Generate a unique message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Create a query to store the message and link to previous message if exists
    let query;
    const params: Neo4jQueryParams = {
      messageId,
      sessionId: data.sessionId,
      role: data.role,
      content: data.content,
      timestamp,
      distinctId: data.distinctId
    };
    
    if (data.previousMessageId) {
      // Create node and link to previous message
      query = `
        MATCH (prev:ChatMessage {messageId: $previousMessageId})
        CREATE (curr:ChatMessage {
          messageId: $messageId,
          sessionId: $sessionId,
          role: $role,
          content: $content,
          timestamp: $timestamp,
          distinctId: $distinctId
        })
        CREATE (prev)-[:NEXT]->(curr)
        RETURN curr.messageId as messageId
      `;
      params.previousMessageId = data.previousMessageId;
    } else {
      // Create first node in conversation
      query = `
        CREATE (curr:ChatMessage {
          messageId: $messageId,
          sessionId: $sessionId,
          role: $role,
          content: $content,
          timestamp: $timestamp,
          distinctId: $distinctId,
          isFirst: true
        })
        RETURN curr.messageId as messageId
      `;
    }
    
    const result = await session.run(query, params);
    
    // Extract the messageId from the result if needed
    const messageIdFromResult = result.records[0]?.get('messageId') || messageId;
    
    console.log('Chat message stored in Neo4j:', messageIdFromResult);
    return { 
      success: true, 
      messageId: messageIdFromResult
    };
    
  } catch (error) {
    console.error('Error storing chat message in Neo4j:', error);
    return { success: false, error };
  } finally {
    // Close the session and driver
    if (session) {
      await session.close();
    }
    if (driver) {
      await driver.close();
    }
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json() as ChatMessageData;
    
    // Validate required fields
    if (!data.sessionId || !data.role || !data.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // If a distinctId is provided, identify the user
    if (data.distinctId) {
      posthogClient.identify({
        distinctId: data.distinctId,
        properties: {
          sessionId: data.sessionId
        }
      });
      
      // Track the chat message event
      posthogClient.capture({
        distinctId: data.distinctId,
        event: 'chat_message_sent',
        properties: {
          sessionId: data.sessionId,
          role: data.role,
          contentLength: data.content.length,
        }
      });
    }
    
    // Store message in Neo4j
    const result = await storeChatMessageInNeo4j(data);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to store chat message' 
        },
        { status: 500 }
      );
    }
    
    // Flush PostHog events if there's a user to identify
    if (data.distinctId) {
      await posthogClient.flush();
    }
    
    // Return success response with the message ID
    return NextResponse.json(
      { 
        success: true, 
        messageId: result.messageId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing chat message:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your request' 
      },
      { status: 500 }
    );
  }
} 