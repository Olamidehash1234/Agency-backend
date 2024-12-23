import express from 'express';
import dotenv from 'dotenv';
import { securityMiddleware } from './middleware/security.js';
import proposalRoutes from './routes/proposalRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(securityMiddleware);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/proposals', proposalRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});