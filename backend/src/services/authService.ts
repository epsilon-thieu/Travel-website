import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const prisma = new PrismaClient(); 

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

const generateSystemToken = (user: any) => {
  return jwt.sign(
    { id: user.id, role: user.role }, 
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );
};

const loginWithGoogle = async (googleToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  
  if (!payload || !payload.email) {
    throw new Error("Không thể lấy email từ tài khoản Google này");
  }

  const { email, name, sub: googleId } = payload;

  let user = await prisma.user.findUnique({ 
    where: { email: email } 
  });

  if (!user) {
    user = await prisma.user.create({ 
      data: { 
        fullName: name || 'Người dùng Google', 
        email: email, 
        googleId: googleId 
      } 
    });
  } else if (!user.googleId) {
    user = await prisma.user.update({
      where: { email: email },
      data: { googleId: googleId }
    });
  }

  const systemToken = generateSystemToken(user);
  return { user, token: systemToken };
};


const loginWithFacebook = async (fbAccessToken: string) => {
  // 1. XÁC THỰC: Gọi Facebook Graph API để lấy thông tin user
  const { data } = await axios.get(
    process.env.FACEBOOK_ID as string, {
    params: {
      fields: 'id,name,email',
      access_token: fbAccessToken
    }
  });

  if (!data || !data.email) {
    throw new Error("Không thể lấy email từ tài khoản Facebook này");
  }

  const { email, name, id: facebookId } = data;

  // 2. TÌM KIẾM: Dùng Prisma findUnique thay vì Mongoose findOne
  let user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!user) {
    // 3. TẠO MỚI: Cú pháp create của Prisma
    user = await prisma.user.create({
      data: {
        fullName: name || 'Người dùng Facebook',
        email: email,
        facebookId: facebookId
      }
    });
  } else if (!user.facebookId) {
    // 4. CẬP NHẬT: Thay vì dùng user.save() như Mongoose, Prisma bắt buộc gọi update
    user = await prisma.user.update({
      where: { email: email },
      data: { facebookId: facebookId }
    });
  }

  const systemToken = generateSystemToken(user);
  return { user, token: systemToken };
}; 

export default { 
  loginWithGoogle, 
  //loginWithFacebook 
};