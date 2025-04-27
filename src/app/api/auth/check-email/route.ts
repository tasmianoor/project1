import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Fetch user data from Notion
    const response = await fetch(
      "https://notion-dgmd-cc.vercel.app/api/query?d=1d44ffe6f70c81cda3aae41da75421aa&r=true&n=a",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    const users = data.QUERY_RESPONSE_KEY_RESULT.PRIMARY_DATABASE.BLOCKS;
    
    // Check if email exists
    const userExists = users.some((user: any) => 
      user.PROPERTIES.Email?.VALUE === email
    );

    return NextResponse.json({ exists: userExists });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    );
  }
} 