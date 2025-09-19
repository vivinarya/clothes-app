import express from 'express';
import { authenticateToken, optionalAuth, requireAdmin, checkOwnership } from '../middleware/auth';

const router = express.Router();

// Route protected by authenticateToken
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated access granted', user: req.User });
});

// Route with optional auth
router.get('/optional', optionalAuth, (req, res) => {
  res.json({ message: 'Optional auth access', user: req.User || null });
});

// Route requiring admin role
router.get('/admin', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: 'Admin access granted', user: req.User });
});

// Route with ownership check (assuming param userId)
router.get('/ownership/:userId', authenticateToken, checkOwnership('userId'), (req, res) => {
  res.json({ message: 'Ownership verified', user: req.user });
});

export default router;
