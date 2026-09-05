import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authService from '../services/authService';

const prisma = new PrismaClient();

const generateToken = (userId: string, email: string) => {
  const secret = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.sign({ userId, email }, secret, { expiresIn: '7d' });
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu!' });
    }

    // Tìm user theo email trong Database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    // Tạo JWT token
    const accessToken = generateToken(user.id, user.email);

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error: any) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({ message: 'Lỗi server nội bộ', error: error.message });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu!' });
    }

    // Kiểm tra xem email đã tồn tại trong Database chưa
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được đăng ký trước đó!' });
    }

    // Mã hóa mật khẩu trước khi lưu xuống DB
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Tạo user mới bằng Prisma
    const newUser = await prisma.user.create({
      data: {
        fullName: name || 'Traveler',
        email,
        passwordHash,
        role: 'user',
      },
    });

    return res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user: {
        id: newUser.id,
        name: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.error('Lỗi đăng ký:', error);
    return res.status(500).json({ message: 'Lỗi server nội bộ', error: error.message });
  }
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
    console.log("CHI TIẾT LỖI SERVICE:", error); 
    res.status(401).json({ 
      message: 'Xác thực Google thất bại', 
      error: error.message 
    });
  }
};

const facebookLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Thiếu token Facebook' });
    }

    const result = await authService.loginWithFacebook(token);

    res.status(200).json({
      message: 'Đăng nhập Facebook thành công',
      user: result.user,
      accessToken: result.token
    });
  } catch (error: any) {
        console.log("CHI TIẾT LỖI SERVICE:", error); 

    res.status(401).json({
      message: 'Xác thực Facebook thất bại',
      error: error.message
    });
  }
};
export default {
  login,
  register,
  googleLogin,
  facebookLogin
};