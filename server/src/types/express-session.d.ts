import 'express-session';

declare module 'express-session' {
  interface SessionData {
    adminId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      admin?: { id: string; email: string };
    }
  }
}