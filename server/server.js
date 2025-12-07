import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../server/config/mongoDB.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
// const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/test', (req,res)=>{
    res.send('API is working fine');
})

if (process.env.NODE_ENV !== "production"){
 const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

}