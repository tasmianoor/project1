import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://notion-dgmd-cc.vercel.app/api/query?d=1d44ffe6f70c817e9f02e4fbb1bae576&r=true&n=a",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Notion data" },
      { status: 500 }
    );
  }
}
