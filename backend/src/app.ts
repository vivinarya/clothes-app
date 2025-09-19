import express from 'express';
import clothesRoutes from './routes/clothes.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/clothes', clothesRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the ai Clothes api');
});


export default app;


