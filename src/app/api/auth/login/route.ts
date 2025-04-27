import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

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
    
    // Find user and verify password
    const user = users.find((user: any) => 
      user.PROPERTIES.Email?.VALUE === email &&
      user.PROPERTIES.Password?.VALUE?.[0]?.text?.content === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    return NextResponse.json({
      id: user.METADATA.id.VALUE,
      email: user.PROPERTIES.Email.VALUE,
      name: user.PROPERTIES.Name.VALUE,
      acctType: user.PROPERTIES["Acct Type"].VALUE
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
} 