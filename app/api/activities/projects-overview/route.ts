export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { zProjectsOverview } from "@/lib/schemas";
import { SESSIONS } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionid, focus } = zProjectsOverview.parse(body);
    const s = SESSIONS.get(sessionid);
    if (!s?.signedIn) return NextResponse.json({ status: "error", message: "unauthorized" }, { status: 401 });

    const projects = [
      { id: "p1", name: "Onboarding", owner: s.userId, progress: 0.5 },
      { id: "p2", name: "Engagement", owner: s.userId, progress: 0.2 }
    ];
    return NextResponse.json({ status: "ok", focus: focus ?? null, projects });
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 400 });
  }
}
