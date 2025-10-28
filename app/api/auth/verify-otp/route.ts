export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { zVerifyOtp } from "@/lib/schemas";
import { OTPS, SESSIONS, USER_BY_SESSION, now, sevenDays } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionid, phone, code } = zVerifyOtp.parse(body);

    const issue = OTPS.get(phone);
    if (!issue) return NextResponse.json({ status: "error", message: "otp_not_found" }, { status: 400 });

    if (issue.sessionid !== sessionid) {
      return NextResponse.json({ status: "error", code: -32041, message: "session_binding_mismatch" }, { status: 409 });
    }
    if (now() > issue.expiresAt) {
      return NextResponse.json({ status: "error", message: "otp_expired" }, { status: 400 });
    }
    if (issue.code !== code) {
      issue.attempts++;
      return NextResponse.json({ status: "error", message: "otp_invalid", attempts: issue.attempts }, { status: 400 });
    }

    const user = {
      userId: "u_" + phone.replace(/\D/g, ""),
      email: `${phone.replace(/\D/g, "")}@example.test`,
      name: "Villager",
      avatar: null,
      status: "active",
      roleId: "role_user",
      roleName: "User"
    };

    SESSIONS.set(sessionid, { signedIn: true, userId: user.userId, email: user.email, roleId: user.roleId, roleName: user.roleName, expiresAt: now() + sevenDays() });
    USER_BY_SESSION.set(sessionid, { userId: user.userId, email: user.email, roleId: user.roleId, roleName: user.roleName });

    OTPS.delete(phone);

    return NextResponse.json({ status: "ok", user: { name: user.name, email: user.email, avatar: user.avatar, status: user.status, roleId: user.roleId, roleName: user.roleName } });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 400 });
  }
}
