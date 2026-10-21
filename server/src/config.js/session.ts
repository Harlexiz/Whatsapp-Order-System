// Session setup. Sessions are stored in the "sessions" collection in MongoDB.
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { config } from './index.js';


export const sessionMiddleware = session({
  name: config.cookieName,      
  secret: config.sessionSecret,  // signs the cookie so it can't be tampered with
  resave: false,
  saveUninitialized: false,      // don't create sessions for anonymous visitors
  rolling: true,                 // extend expiry on every request
  
  store: MongoStore.create({
    mongoUrl: config.mongoUri,
    collectionName: 'sessions',
    ttl: config.sessionTtlMs / 1000, // MongoDB deletes expired sessions automatically
  }),
  
  cookie: {
    httpOnly: true,              // JavaScript cannot read the cookie
    secure: config.isProd,       // HTTPS only in production
    sameSite: 'lax',             // basic CSRF protection
    maxAge: config.sessionTtlMs,
  },
});