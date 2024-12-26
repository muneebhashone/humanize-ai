import { NextResponse } from 'next/server';

export async function GET() {
  const isAuthenticated = Math.random() > 0.5; // Simulate authentication status
  if (isAuthenticated) {
    return NextResponse.json({ isAuthenticated: true });
  } else {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}