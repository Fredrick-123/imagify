// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from '../server/config/mongoDB.js';
// import userRouter from './routes/userRoutes.js';
// import imageRouter from './routes/imageRoutes.js';
// // const PORT = process.env.PORT || 4000;

// const app = express();

// app.use(cors());
// app.use(express.json());
// connectDB();

// app.use('/api/user', userRouter);
// app.use('/api/image', imageRouter);

// app.get('/test', (req,res)=>{
//     res.send('API is working fine');
// })

// if (process.env.NODE_ENV !== "production"){
//  const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// }

// export default app;

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from '../server/config/mongoDB.js';
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

// Connect MongoDB
await connectDB()

// Routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/api/status', (req, res) => {
  res.json({ success: true, message: "API is working!" })
})

// LOCAL DEV ONLY — NOT FOR VERCEL
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// 🚀 Required by Vercel
export default app;