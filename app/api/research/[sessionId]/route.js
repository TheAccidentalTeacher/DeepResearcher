import { NextResponse } from 'next/server';

// Mock session storage (same as main research route)
const researchSessions = new Map();

export async function GET(request, { params }) {
  try {
    const { sessionId } = params;
    const session = researchSessions.get(sessionId);

    if (!session) {
      return NextResponse.json({
        success: false,
        error: { message: 'Research session not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: session
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: 'Internal server error' }
    }, { status: 500 });
  }
}
