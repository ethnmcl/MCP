import { z } from 'zod';
export const zSessionOnly=z.object({sessionid:z.string().min(1)});
export const zRequestOtp=z.object({sessionid:z.string().min(1),phone:z.string().min(5),purpose:z.enum(['signin','signup'])});
export const zVerifyOtp=z.object({sessionid:z.string().min(1),phone:z.string().min(5),code:z.string().length(6)});
export const zLogin=z.object({sessionid:z.string().min(1),email:z.string().email(),password:z.string().min(1),rememberme:z.boolean().optional()});
export const zActivitiesList=z.object({sessionid:z.string().min(1),status:z.enum(['upcoming','completed','all']).optional()});
export const zPulsesLog=z.object({sessionid:z.string().min(1),villagerID:z.string().optional(),firstName:z.string().optional(),lastName:z.string().optional(),summary:z.string().min(1)});
export const zProjectsOverview=z.object({sessionid:z.string().min(1),focus:z.string().optional()});
