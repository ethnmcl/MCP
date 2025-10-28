export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { zSessionOnly } from "@/lib/schemas";
import { SESSIONS, PULSES } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionid } = zSessionOnly.parse(body);
    const s = SESSIONS.get(sessionid);
    if (!s?.signedIn) return NextResponse.json({ status: "error", message: "unauthorized" }, { status: 401 });

    const list = PULSES.get(sessionid) || [];
    return NextResponse.json({ status: "ok", pulses: list });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 400 });
  }
}
