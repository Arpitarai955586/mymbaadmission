import { authGuard } from "@/lib/auth";
import { NextResponse } from "next/server";
import { roleGuard } from "@/lib/roleGuard";

export const GET = async (req: Request) => {

     const auth = authGuard(req);
      if ("error" in auth) {
        return NextResponse.json(
          { message: auth.error },
          { status: auth.status }
        );
      }

     const roleCheck = roleGuard(auth.user.role, ["ADMIN"]);
      if (roleCheck) return roleCheck;
    
  return new Response("Hello from Anamika's admin route!");
}