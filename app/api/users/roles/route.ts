import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";

// If you use `request` you don't need the type
export async function POST(req: Request) {
  try {
    // Get the user ID from the session
    const { userId } = auth();

    if (!userId || !isAdmin(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, role } = await req.json();
    const params = { publicMetadata: { role: role } };
    const updateRole = await clerkClient.users.updateUser(id, params);
    return NextResponse.json({ updateRole });
  } catch (error) {
    console.log("[USERS ROLE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
