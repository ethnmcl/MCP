export type Session = {
  signedIn: boolean;
  userId?: string;
  email?: string;
  roleId?: string;
  roleName?: string;
  expiresAt?: number; // epoch ms
};

export type OtpIssue = {
  sessionid: string;
  phone: string;
  code: string;
  expiresAt: number;
  attempts: number;
  purpose: "signin" | "signup";
};

export type Pulse = {
  id: string;
  sessionid: string;
  actorUserId: string;
  targetVillagerId?: string;
  summary: string;
  ts: number;
  source: "mcp";
};

const g = globalThis as any;

g.__SESSIONS ||= new Map<string, Session>();
g.__OTPS ||= new Map<string, OtpIssue>(); // keyed by phone
g.__PULSES ||= new Map<string, Pulse[]>(); // keyed by sessionid
g.__USER_BY_SESSION ||= new Map<string, { userId: string; email: string; roleId: string; roleName: string }>();

export const SESSIONS: Map<string, Session> = g.__SESSIONS;
export const OTPS: Map<string, OtpIssue> = g.__OTPS;
export const PULSES: Map<string, Pulse[]> = g.__PULSES;
export const USER_BY_SESSION: Map<string, { userId: string; email: string; roleId: string; roleName: string }> = g.__USER_BY_SESSION;

export function now() { return Date.now(); }
export function fiveMin() { return 5 * 60 * 1000; }
export function sevenDays() { return 7 * 24 * 60 * 60 * 1000; }
export function genCode() { return Math.floor(100000 + Math.random() * 900000).toString(); }
export function genId() { return Math.random().toString(36).slice(2); }
