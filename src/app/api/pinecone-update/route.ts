// app/api/pinecone-update/route.ts
// pcsk_6wioo4_R4oF6n3LRnmoNBU8qGkF9xk29xKcPoa2rYTTfRz92yuxvAxVqeJqsav5jDDWZeD

// app/api/pinecone-update/route.ts
import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: "pcsk_6wioo4_R4oF6n3LRnmoNBU8qGkF9xk29xKcPoa2rYTTfRz92yuxvAxVqeJqsav5jDDWZeD" }); // Replace with actual key

// Replace with actual values
const INDEX_NAME = "dev";
const INDEX_HOST = "https://dev-eo514gd.svc.aped-4627-b74a.pinecone.io"; // e.g., "your-index-xxxx.svc.us-west1-gcp.pinecone.io"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blocks, url } = body;

    if (!blocks || !Array.isArray(blocks)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const namespace = pc.index(INDEX_NAME, INDEX_HOST).namespace("default");

    const records = blocks.map((block, i) => ({
      _id: `block-${i}`,
      text: block.text,
      path: block.path,
      url: url,
    }));

    const result = await namespace.upsertRecords(records);
    console.log("Upsert result:", result);

    return NextResponse.json({ message: 'Blocks uploaded to Pinecone' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error uploading blocks:', err.message);
      console.error(err.stack);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    console.error('Unknown error uploading blocks:', err);
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}