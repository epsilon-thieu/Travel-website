import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authService from '../services/authService';
import { getRandomValues } from 'crypto';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';

const prisma = new PrismaClient();

const generateToken = (userId: string, email: string) => {
  const secret = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.sign({ userId, email }, secret, { expiresIn: '7d' });
};

export const generateOTP = (length: number = 6): string => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu!' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

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

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu!' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được đăng ký trước đó!' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

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

const forgetPass = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Email khong tim thay!' });
    }

    const otpCode = generateOTP(6);
    const secret = process.env.JWT_SECRET || 'default_secret';
    const tempToken = jwt.sign(
      { email, otp: otpCode }, 
        secret, 
      { expiresIn: '5m' }
    );

    await authService.sendOtpEmail(email, otpCode);

    return res.status(200).json({
      message: 'Đã gửi otp đến mail của bạn!',
      tempToken,
    });
  }
  catch (error: any) {
    console.log("CHI TIẾT LỖI SERVICE:", error);
  }
};

const resetPass = async (req: Request, res: Response) => {
  try {
    const { email, otp, tempToken, newPassword } = req.body;

    if (!tempToken) {
      return res.status(400).json({ message: 'Thiếu mã xác thực tạm thời! Vui lòng thao tác lại từ đầu.' });
    }

    const secret = process.env.JWT_SECRET || 'default_secret';
    let decoded: any;

    try {
      decoded = jwt.verify(tempToken, secret);
    } catch (err) {
      return res.status(400).json({ message: 'Mã OTP đã hết hạn hoặc không hợp lệ!' });
    }

    if (decoded.email !== email || decoded.otp !== otp) {
      return res.status(400).json({ message: 'Mã OTP không chính xác!' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    return res.status(200).json({ 
      message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.' 
    });
  }

  catch (error: any) {
    console.log("CHI TIẾT LỖI SERVICE:", error);
  }
};

export default {
  login,
  register,
  googleLogin,
  facebookLogin,
  forgetPass,
  resetPass
};