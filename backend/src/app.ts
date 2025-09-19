import express from 'express';
import 'C:/ai_cloth/backend/src/types/express/index.d.ts';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.ts';
import clothingRoutes from './routes/clothingRoutes.ts';
import testRoutes from './routes/testRoutes';

dotenv.config({ path: '../.env' });

console.log('Current directory:', process.cwd());
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/clothing', clothingRoutes);
app.use('/api/test', testRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});


mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the AI Clothes API');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;



