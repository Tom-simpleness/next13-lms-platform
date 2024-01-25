import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";
import { create } from "domain";

// If you use `request` you don't need the type
export async function POST(req: Request) {
  try {
    // Get the user ID from the session
    const { userId } = auth();
    const { email } = await req.json();

    if (!userId) return NextResponse.redirect("/sign-in");

    if (!email) return NextResponse.redirect("/admin");

    const createUserParams = {
      emailAddress: [email],
      password: "2b91AkcakDPSIcx7SS",
    };

    const updatedUser = await clerkClient.users.createUser(createUserParams);
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
