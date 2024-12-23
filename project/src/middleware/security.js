import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import { corsConfig } from '../config/cors.js';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

export const securityMiddleware = [
  cors(corsConfig),
  helmet(),
  limiter
];