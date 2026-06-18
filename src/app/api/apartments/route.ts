import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://localhost:3001';

// GET all apartments
export async function GET() {
  try {
    const res = await fetch(`${API_URL}/apartments`, {
      cache: 'no-store',
    });
    const apartments = await res.json();
    return NextResponse.json(apartments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch apartments' },
      { status: 500 }
    );
  }
}

// POST create new apartment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/apartments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const newApartment = await res.json();
    return NextResponse.json(newApartment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create apartment' },
      { status: 500 }
    );
  }
}
