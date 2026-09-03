import express from 'express';
import authController from '../controllers/authController'; 

const router = express.Router();

router.post('/google', authController.googleLogin);

// router.post('/facebook', authController.facebookLogin);
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;