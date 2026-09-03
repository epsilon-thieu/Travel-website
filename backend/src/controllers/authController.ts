import { Request, Response } from 'express';
import authService from '../services/authService';

const login = (req: Request, res: Response) => {
  res.json({ message: 'Đây là API đăng nhập' });
};

const register = (req: Request, res: Response) => {
  res.json({ message: 'Đây là API đăng ký' });
};

const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body; 

    const result = await authService.loginWithGoogle(token);

    res.status(200).json({
      message: 'Đăng nhập Google thành công',
      user: result.user,
      accessToken: result.token
    });
  } catch (error: any) { 
    res.status(401).json({ 
      message: 'Xác thực Google thất bại', 
      error: error.message 
    });
  }
};

export default {
  login,
  register,
  googleLogin
};