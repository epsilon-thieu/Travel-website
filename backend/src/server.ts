import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import tourRoutes from './routes/tourRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(helmet());

prisma.$connect()
  .then(() => console.log('Đã kết nối Database PostgreSQL thành công!'))
  .catch((err: Error) => console.error('Lỗi kết nối Database:', err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);

// Thêm kiểu Request và Response vào đây để hết lỗi "any type"
app.get('/', (req: Request, res: Response) => {
  res.send('Chúc mừng cậu chủ thắng lớn');
});

const PORT = 3600;
app.listen(PORT, () => {
  console.log(`Server đang rặn tại: http://localhost:${PORT}`);
});