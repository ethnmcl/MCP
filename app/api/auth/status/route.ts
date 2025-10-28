export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { zSessionOnly } from "@/lib/schemas";
import { SESSIONS } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionid } = zSessionOnly.parse(body);
    const s = SESSIONS.get(sessionid);
    if (!s) return NextResponse.json({ signedIn: false });
    return NextResponse.json({ signedIn: !!s.signedIn, expiresAt: s.expiresAt, userId: s.userId, email: s.email, roleId: s.roleId, roleName: s.roleName });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 400 });
  }
}
