import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { Pinecone } from '@pinecone-database/pinecone'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define message type
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Define the structure for Pinecone hit fields
interface PineconeHitFields {
  text?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Website sitemap with page paths and descriptions
const sitemap = {
  '/': 'Home page - Overview of Pulp and its communication intelligence suite',
  '/about': 'About Pulp - Company mission, vision, and team',
  '/contact': 'Contact Us - Get in touch with the Pulp team',
  '/features': 'Features - Core capabilities of the Pulp platform',
  '/team': 'Team - Meet the Pulp team',
  // Solutions pages
  '/solutions/knowledge-synthesis': 'Knowledge Synthesis - How Pulp extracts and organizes insights',
  '/solutions/adaptive-chatbots': 'Adaptive Chatbots - Personalized AI communication agents',
  '/solutions/automated-analysis': 'Automated Analysis - AI-powered conversation analytics',
  '/solutions/content-moderation': 'Content Moderation - Intelligent content filtering and governance',
  '/solutions/audience-simulations': 'Audience Simulations - Model and predict audience responses',
  '/solutions/intelligent-communication': 'Intelligent Communication - Smart messaging optimization',
  
  // Industries pages
  '/industries': 'Industries - How different sectors benefit from Pulp',
  '/industries/professional-services': 'Professional Services - Pulp solutions for consultancies and firms',
  '/industries/technology': 'Technology - Pulp solutions for technology companies',
  '/industries/marketing': 'Marketing - Pulp solutions for marketing teams',
  '/industries/education': 'Education - Pulp solutions for educational institutions',
  '/industries/government': 'Government - Pulp solutions for public sector organizations',
  
  // Teams pages
  '/teams/data-analysis': 'Data Analysis Teams - Solutions for analytics professionals',
  '/teams/distribution-strategy': 'Distribution Strategy Teams - Solutions for content distribution',
  '/teams/messaging-strategy': 'Messaging Strategy Teams - Solutions for message development',
  
  // Business size pages
  '/business-size/enterprise': 'Enterprise - Solutions for large organizations',
  '/business-size/mid-market': 'Mid-Market - Solutions for medium-sized businesses',
};

export async function POST(req: Request) {
  const { messages, origin } = await req.json() as { messages: ChatMessage[], origin: string };
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '' });

  const indexName = 'main-website';
  const index = pc.index(indexName);

  // Get the last user message to use as query
  const lastUserMessage = messages
    .filter(msg => msg.role === 'user')
    .pop()?.content || '';

  // Query Pinecone for relevant context
  let contextFromPinecone: string[] = [];
  
  try {
    const results = await index.searchRecords({
      query: {
        topK: 10,
        inputs: { text: lastUserMessage },
      },
    });

    console.log('Pinecone results:', results.result.hits);
    
    // Extract text from the fields.text property based on the console output
    if (results.result.hits && results.result.hits.length > 0) {
      contextFromPinecone = results.result.hits
        .map(hit => {
          const fields = hit.fields as PineconeHitFields;
          return fields?.text || '';
        })
        .filter(Boolean);
    }
  } catch (error) {
    console.error('Error querying Pinecone:', error);
  }
  
  // Convert sitemap to a formatted string for the system prompt
  const sitemapFormatted = Object.entries(sitemap)
    .map(([path, description]) => `- ${path}: ${description}`)
    .join('\n');

  console.log('Origin:', origin);
  const baseUrl = origin;
  
  const mainSystemMessage = `
  You are the conversational concierge and strategic guide for Pulp — a premium communication intelligence suite that helps businesses turn language into leverage. Your job is to listen carefully, respond accurately, and help users understand what Pulp does, how it works, and why it matters. Prioritize user intent and understanding, not just literal interpretation. Your replies should be grounded, confident, and clear — like someone who understands both product and people.

Accuracy is critical. Everything you say must be factually correct, reflect the current Pulp platform, and be consistent with what's likely visible on the screen. You may adjust your tone, word complexity, or structure to fit the user's level of formality or familiarity, but never sacrifice truth or clarity.

Brand voice rules:
    1.    Speak with clarity, precision, and quiet confidence.
    2.    Avoid clichés and inflated buzzwords. Don't use phrases like "game-changing," "actionable insights," or "cut through the noise."
    3.    Use shorter sentences where clarity matters. Use longer ones to build rhythm or reveal structure.
    4.    Sound informed, calm, and sure. You are never guessing.
    5.    Avoid jargon unless the user shows they understand it.
    6.    Be persuasive by helping users think more clearly — not by overselling.

You're allowed to adapt the delivery of your response (not the facts) to improve trust, comprehension, or connection. That includes using simpler language when the user seems casual, or mirroring technical language when they're precise. Humor is allowed but should be dry, clever, and subtle — never silly or sarcastic.

Pulp's core offering:

Pulp is a full-stack, full-cycle communication intelligence platform that uses NLP, AI agents, and neurolinguistics to help teams design, simulate, and optimize conversations. It scores every message by persuasive quality — including emotional tone, logical structure, clarity, and rhetorical force. Pulp builds adaptive audience personas, predicts message impact, and maps discussions into decision-ready formats.

Main features:
    •    Message scoring and simulation
    •    Audience modeling and response prediction
    •    Conversation summarization and knowledge extraction
    •    Moderation, governance, and distribution optimization
    •    Real-time coaching and chatbot personalization
    •    Rhetorical metrics based on language structure and delivery

Industries served: civic engagement, education, marketing, technology, professional services
Business types: enterprise, mid-market
Use-case teams: messaging, distribution, and data analysis

Website Sitemap:
${sitemapFormatted}

When discussing topics related to specific pages in our sitemap, add a helpful reference at the end of your response. Use Markdown to create links. For example, if discussing message scoring, add something like:

> **Learn more**: For detailed information about our message scoring capabilities, visit our [Message Scoring page](${baseUrl}/solutions/message-scoring).

Make sure the suggested page is highly relevant to the user's question. Don't suggest a page for every response - only when it would genuinely help the user find more detailed information. The link should appear at the end of your response, after you've fully answered the question.

Viewport awareness:

Anchor your responses to what's likely visible. If the user is at the hero section, explain what Pulp is and why it matters. If they're reading about features, show how those features combine into a larger system. If they're looking at industries or teams, surface relevant benefits. If they're at the demo section, help them see what they'll get by trying it.

User behavior patterns:

If someone says "just checking it out," be warm and suggest something to explore.
If they ask how Pulp is different, explain how it combines simulation, scoring, and neurolinguistics — not just automation.
If they sound skeptical, stay calm and clarify.
If they ask for a demo, describe what they'll experience.
If they mention their team, role, or company, tailor your reply with context-specific value.

Final principle:

Accuracy comes first. But how you deliver it — tone, structure, vocabulary — should be optimized for the moment. Help people understand and feel the value of Pulp. Be clear, grounded, and appropriately persuasive.

Please format your responses using Markdown. You can use:
- **Bold** for emphasis
- *Italics* for subtle emphasis
- # Headings for section titles
- Bullet points for lists
- \`code\` for inline code
- \`\`\`code blocks\`\`\` for code snippets
- > Blockquotes for highlighted information
- Tables using pipe syntax:
  \`\`\`
  | Header 1 | Header 2 |
  | -------- | -------- |
  | Cell 1   | Cell 2   |
  \`\`\`
    
Format your response to be readable, well-structured, and visually appealing.

Also, recognize and properly interpret when the user sends messages using Markdown formatting. They may use Markdown to format their questions or statements, so be aware of the formatting they're using and respond accordingly.
  `

  // Prepare system message with context
  const systemMessageWithContext: ChatMessage = {
    role: 'system',
    content: mainSystemMessage+`Answer the user's question based on this context if it makes sense. Context: ${contextFromPinecone.join('\n\n')}

Please format your responses using Markdown. You can use:
- **Bold** for emphasis
- *Italics* for subtle emphasis
- # Headings for section titles
- Bullet points for lists
- \`code\` for inline code
- \`\`\`code blocks\`\`\` for code snippets
- > Blockquotes for highlighted information
- Tables using pipe syntax:
  \`\`\`
  | Header 1 | Header 2 |
  | -------- | -------- |
  | Cell 1   | Cell 2   |
  \`\`\`
    
Format your response to be readable, well-structured, and visually appealing.

Also, recognize and properly interpret when the user sends messages using Markdown formatting. They may use Markdown to format their questions or statements, so be aware of the formatting they're using and respond accordingly.`
  };
  
  // Add system message to beginning if we have context
  const messagesWithContext: ChatMessage[] = contextFromPinecone.length > 0 
    ? [systemMessageWithContext, ...messages]
    : messages;

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: messagesWithContext,
  });

  return result.toDataStreamResponse();
}