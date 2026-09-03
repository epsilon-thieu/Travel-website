import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Import routes (nhớ đảm bảo các file này cũng đang dùng export default)
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ten_database_cua_ban')
  .then(() => console.log('✅ Đã kết nối Database MongoDB thành công!'))
  .catch((err: Error) => console.error('❌ Lỗi kết nối Database:', err));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Thêm kiểu Request và Response vào đây để hết lỗi "any type"
app.get('/', (req: Request, res: Response) => {
  res.send('🎉 Chúc mừng! Server Backend của bạn đang hoạt động cực mượt!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});