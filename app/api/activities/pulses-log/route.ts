export const runtime='nodejs';
import { NextResponse } from 'next/server';
import { zPulsesLog } from '../../../../lib/schemas';
import { SESSIONS, USER_BY_SESSION, PULSES, genId, now } from '../../../../lib/store';

export async function POST(req:Request){
  try{const body=await req.json();const {sessionid,villagerID,firstName,lastName,summary}=zPulsesLog.parse(body);
    const s=SESSIONS.get(sessionid);
    if(!s?.signedIn) return NextResponse.json({status:'error',message:'unauthorized'},{status:401});
    const user=USER_BY_SESSION.get(sessionid);
    const actingOnBehalf=!!(villagerID || (firstName && lastName));
    if(actingOnBehalf && !(user?.roleName==='Admin' || user?.roleName==='Coach')) return NextResponse.json({status:'error',message:'forbidden_on_behalf'},{status:403});
    const pulse={id:genId(),sessionid,actorUserId:s.userId!,targetVillagerId:villagerID,summary,ts:now(),source:'mcp' as const};
    const list=PULSES.get(sessionid) || []; list.unshift(pulse); PULSES.set(sessionid,list.slice(0,100));
    return NextResponse.json({status:'ok',pulse});
  }catch(e:any){return NextResponse.json({status:'error',message:e.message},{status:400});}
}
