import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

const getTour = async (req: Request, res: Response) => {
    try {
        const tourId = req.tour?.
    }
    catch (error: any) {

    }
};