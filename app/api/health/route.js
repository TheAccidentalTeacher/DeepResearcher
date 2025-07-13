import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Deep Research Assistant API is running on Vercel',
    timestamp: new Date().toISOString(),
    platform: 'vercel',
    version: '1.0.0'
  });
}
