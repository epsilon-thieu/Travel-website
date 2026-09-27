import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any; 
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded; 

    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

export const checkAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user && user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Cảnh báo: Chỉ Admin mới được thực hiện hành động này!' });
  }
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Bạn đã thử quá nhiều lần. Vui lòng quay lại sau 15 phút!' }
});
