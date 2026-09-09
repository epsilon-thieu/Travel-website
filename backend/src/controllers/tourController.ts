import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getTourAmount = async (req: Request, res: Response) => {
    try {
        const tourAmount = await prisma.tour.count();
        return res.status(200).json({
            message: 'Lấy số lượng tour thành công',
            tourAmount,
        });
    }
    catch (error: any) {
        console.error('Lỗi:', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

const getTour = async (req: any, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        const skip = (page - 1) * limit;

        const [tours, totalTours] = await Promise.all([
            prisma.tour.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.tour.count(),
        ]);

        return res.status(200).json({
            message: 'Lấy danh sách tour thành công',
            tours,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalTours / limit),
                totalItems: totalTours,
                limit,
            },
        });
    } catch (error: any) {
        console.error('Lỗi lấy danh sách tour:', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export default {
    getTourAmount,
    getTour
};