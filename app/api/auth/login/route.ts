export const runtime='nodejs';
import { NextResponse } from 'next/server';
import { zLogin } from '../../../../lib/schemas';
import { SESSIONS, USER_BY_SESSION, now, sevenDays } from '../../../../lib/store';

export async function POST(req:Request){
  try{const body=await req.json();const {sessionid,email}=zLogin.parse(body);
    const user={userId:'u_'+email.split('@')[0],name:'Villager',avatar:null,status:'active',roleId:'role_user',roleName:'User',email};
    SESSIONS.set(sessionid,{signedIn:true,userId:user.userId,email:user.email,roleId:user.roleId,roleName:user.roleName,expiresAt:now()+sevenDays()});
    USER_BY_SESSION.set(sessionid,{userId:user.userId,email:user.email,roleId:user.roleId,roleName:user.roleName});
    return NextResponse.json({status:'ok',user:{name:user.name,email:user.email,avatar:user.avatar,status:user.status,roleId:user.roleId,roleName:user.roleName},expiresAt:now()+sevenDays()});
  }catch(e:any){return NextResponse.json({status:'error',message:e.message},{status:400});}
}
