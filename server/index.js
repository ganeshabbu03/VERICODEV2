import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env configuration
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for credentials and frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ error: 'An unexpected error occurred on the server.' });
});

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(40));
  console.log(`🚀 Vericode AI Backend listening on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api/auth`);
  console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log('='.repeat(40) + '\n');
});
