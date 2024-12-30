import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call your backend API
    const response = await api.post("/auth/login/email", body)
    const cookieStore = await cookies();
    
    cookieStore.set({
      name: "token",
      value: response.data.data.token,   
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
} 