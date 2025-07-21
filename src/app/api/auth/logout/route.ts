import { NextResponse } from "next/server";

export async function POST() {
  const response = new NextResponse(
    JSON.stringify({ message: "Logout success" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
