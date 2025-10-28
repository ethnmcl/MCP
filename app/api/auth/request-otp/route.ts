export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { zRequestOtp } from "@/lib/schemas";
import { OTPS, genCode, now, fiveMin } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionid, phone, purpose } = zRequestOtp.parse(body);

    const code = genCode();
    OTPS.set(phone, { sessionid, phone, code, purpose, expiresAt: now() + fiveMin(), attempts: 0 });

    return NextResponse.json({ status: "ok", message: "otp_sent", debugCode: code });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 400 });
  }
}
