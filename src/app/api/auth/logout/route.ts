import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Delete the token cookie
    cookieStore.delete({
      name: "token",
      path: "/",
    });

    return NextResponse.json({ 
      success: true,
      message: "Logged out successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
