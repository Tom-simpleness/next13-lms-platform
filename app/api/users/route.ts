import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";
import { create } from "domain";
import { isAdmin } from "@/lib/admin";
import { generatePassword } from "@/lib/password";

// If you use `request` you don't need the type
export async function POST(req: Request) {
  try {
    // Get the user ID from the session
    const { userId } = auth();
    const { email, role } = await req.json();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!email) return NextResponse.redirect("/admin/create");

    const createUserParams = {
      emailAddress: [email],
      password: generatePassword(),
      publicMetadata: { role: role },
    };

    const updatedUser = await clerkClient.users.createUser(createUserParams);
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
