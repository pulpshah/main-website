import { NextResponse } from "next/server";
import neo4j from "neo4j-driver";

// Interface for chat message data
interface ChatMessageData {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  previousMessageId?: string;
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
    let params: any = {
      messageId,
      sessionId: data.sessionId,
      role: data.role,
      content: data.content,
      timestamp
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
          timestamp: $timestamp
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
          isFirst: true
        })
        RETURN curr.messageId as messageId
      `;
    }
    
    const result = await session.run(query, params);
    
    console.log('Chat message stored in Neo4j:', messageId);
    return { 
      success: true, 
      messageId: messageId
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