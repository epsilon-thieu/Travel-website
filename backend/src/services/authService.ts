import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

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

const loginWithFacebook = async (facebookToken: string) => {
};

export default { 
  loginWithGoogle, 
  loginWithFacebook 
};