import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

prisma.$connect()
  .then(() => console.log('✅ Đã kết nối Database PostgreSQL thành công!'))
  .catch((err: Error) => console.error('❌ Lỗi kết nối Database:', err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Thêm kiểu Request và Response vào đây để hết lỗi "any type"
app.get('/', (req: Request, res: Response) => {
  res.send('🎉 Chúc mừng! Server Backend của bạn đang hoạt động cực mượt!');
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});