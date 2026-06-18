import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://localhost:3001';

// GET single apartment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/apartments/${params.id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }
    
    const apartment = await res.json();
    return NextResponse.json(apartment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch apartment' },
      { status: 500 }
    );
  }
}

// PUT update apartment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/apartments/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    const updatedApartment = await res.json();
    return NextResponse.json(updatedApartment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update apartment' },
      { status: 500 }
    );
  }
}

// DELETE apartment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/apartments/${params.id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete apartment' },
      { status: 500 }
    );
  }
}
