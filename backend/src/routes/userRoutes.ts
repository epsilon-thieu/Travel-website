import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint: GET /api/users/profile
// Phải vượt qua bouncier verifyToken trước thì mới được chạy hàm getProfile
router.get('/profile', verifyToken, getProfile);

export default router;