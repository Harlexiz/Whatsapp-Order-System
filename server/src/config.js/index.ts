// Single place that reads environment variables. Fails fast if something is missing.
import 'dotenv/config';

if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET is required');
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');

export const config = {
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
  sessionTtlMs: 2 * 60 * 60 * 1000, // 2 hours of inactivity
  cookieName: 'asoebi_admmin.sid',
};