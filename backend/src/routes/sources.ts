import express from 'express';
import { researchRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Health check for sources service
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'Sources service is running',
      timestamp: new Date().toISOString(),
    },
  });
});

// Get available sources endpoint (placeholder)
router.get('/', (req, res) => {
  res.json({
    success: false,
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'Sources endpoints will be implemented in the next phase',
    },
  });
});

// Add new source endpoint (placeholder)
router.post('/', researchRateLimiter, (req, res) => {
  res.json({
    success: false,
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'Sources endpoints will be implemented in the next phase',
    },
  });
});

export default router;
