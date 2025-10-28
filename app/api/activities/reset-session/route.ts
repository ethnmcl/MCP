export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { zSessionOnly } from "@/lib/schemas";
import { SESSIONS, PULSES } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionid } = zSessionOnly.parse(body);
    if (!SESSIONS.get(sessionid)) {
      PULSES.delete(sessionid);
      return NextResponse.json({ status: "ok", message: "reset" });
    }
    PULSES.delete(sessionid);
    return NextResponse.json({ status: "ok", message: "reset" });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 400 });
  }
}
