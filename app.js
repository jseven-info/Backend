const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();



const allowedOrigins = [
  'http://localhost:5173',
  'https://d3c1-2409-40f3-101b-15e2-f845-21bc-7933-5f2d.ngrok-free.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
