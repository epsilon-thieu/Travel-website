import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId || req.user?.id;

        if (!userId) {
            return res.status(400).json({message: 'Khong tim thay id nguoi dung'});
        }

        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {
                email : true,
                fullName: true,
                phoneNumber: true,
                avatarUrl: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản trong hệ thống!' });
        }

        return res.status(200).json({
            message: 'Lấy thông tin profile thành công',
            user,
        });
    }
    catch (error: any) {
        console.error('Lỗi lấy profile:', error);
        return res.status(500).json({ message: 'Lỗi server nội bộ', error: error.message });
    }
};

export {
    getProfile
};