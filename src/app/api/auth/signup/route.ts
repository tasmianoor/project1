import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name, password, acctType } = await request.json();

    // Fetch existing users from Notion
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
    
    // Check if email already exists
    const userExists = users.some((user: any) => 
      user.PROPERTIES.Email?.VALUE === email
    );

    if (userExists) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Create new user in Notion
    const createResponse = await fetch(
      "https://notion-dgmd-cc.vercel.app/api/create",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          databaseId: "1d44ffe6f70c81cda3aae41da75421aa",
          properties: {
            Name: { title: [{ text: { content: name } }] },
            Email: { email },
            Password: { rich_text: [{ text: { content: password } }] },
            "Acct Type": { select: { name: acctType } },
            "Account created on": { date: { start: new Date().toISOString() } },
            User: { relation: [] },
            Phone: { phone_number: null },
            Details: { rich_text: [] },
            Address: { rich_text: [] },
            Photo: { external: [] }
          }
        })
      }
    );

    if (!createResponse.ok) {
      throw new Error('Failed to create user');
    }

    const newUser = await createResponse.json();

    // Return user data (excluding password)
    return NextResponse.json({
      id: newUser.id,
      email,
      name,
      acctType
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 