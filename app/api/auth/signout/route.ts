export const runtime='nodejs';
import { NextResponse } from 'next/server';
import { zSessionOnly } from '../../../../lib/schemas';
import { SESSIONS, USER_BY_SESSION } from '../../../../lib/store';

export async function POST(req:Request){
  try{const body=await req.json();const {sessionid}=zSessionOnly.parse(body);
    SESSIONS.delete(sessionid); USER_BY_SESSION.delete(sessionid);
    return NextResponse.json({status:'ok',message:'signed_out'});
  }catch(e:any){return NextResponse.json({status:'error',message:e.message},{status:400});}
}
