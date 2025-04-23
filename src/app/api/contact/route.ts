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

// Interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  distinctId?: string; // PostHog distinct ID for user identification
}

// Storage function to connect to Neo4j and store contact data
async function storeContactInNeo4j(data: ContactFormData) {
  // Get Neo4j connection details from environment variables
  const uri = process.env.NEO4J_URI || "";
  const username = process.env.NEO4J_USERNAME || "";
  const password = process.env.NEO4J_PASSWORD || "";
  
  // Return early if connection details are missing
  if (!uri || !username || !password) {
    console.warn('Neo4j connection details not found in environment variables');
    return { success: true };
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
    
    // Create date for timestamp
    const timestamp = new Date().toISOString();
    
    // Create a node in Neo4j with all contact form data
    const result = await session.run(
      `
      CREATE (c:Main_Website_Contact {
        name: $name,
        email: $email,
        company: $company,
        subject: $subject,
        message: $message,
        timestamp: $timestamp,
        distinctId: $distinctId
      })
      RETURN c
      `,
      {
        name: data.name,
        email: data.email,
        company: data.company || "",
        subject: data.subject,
        message: data.message,
        timestamp: timestamp,
        distinctId: data.distinctId || ""
      }
    );
    
    console.log('Contact data stored in Neo4j:', result.summary.counters.updates());
    return { success: true };
    
  } catch (error) {
    console.error('Error storing contact data in Neo4j:', error);
    // Don't throw the error, just log it to prevent breaking the form submission
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
    const data = await request.json() as ContactFormData;
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Identify user in PostHog using email as the ID if no distinctId provided
    const distinctId = data.distinctId || data.email;
    
    // Identify the user
    posthogClient.identify({
      distinctId: distinctId,
      properties: {
        name: data.name,
        email: data.email,
        company: data.company || undefined
      }
    });
    
    // Track the contact form submission event
    posthogClient.capture({
      distinctId: distinctId,
      event: 'contact_form_submitted',
      properties: {
        subject: data.subject,
        has_company: !!data.company
      }
    });
    
    // Add the distinctId to the data for Neo4j storage
    data.distinctId = distinctId;
    
    // Store data in Neo4j
    await storeContactInNeo4j(data);
    
    // Flush events before ending the request
    await posthogClient.flush();
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your request' 
      },
      { status: 500 }
    );
  }
} 