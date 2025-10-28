export const runtime='nodejs';
import { NextResponse } from 'next/server';
import { zActivitiesList } from '../../../../lib/schemas';
import { SESSIONS } from '../../../../lib/store';

export async function POST(req:Request){
  try{const body=await req.json();const parsed=zActivitiesList.parse(body);
    const sessionid=parsed.sessionid;const status=parsed.status ?? 'upcoming';
    const s=SESSIONS.get(sessionid);
    if(!s?.signedIn) return NextResponse.json({status:'error',message:'unauthorized'},{status:401});
    const activities=[{id:'a1',title:'Daily Check-In',status:'upcoming'},{id:'a2',title:'Weekly Review',status:'completed'}];
    const filtered= status==='all'?activities:activities.filter(a=>a.status===status);
    return NextResponse.json({status:'ok',activities:filtered});
  }catch(e:any){return NextResponse.json({status:'error',message:e.message},{status:400});}
}
