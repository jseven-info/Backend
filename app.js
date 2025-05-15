const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();



app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // allow cookies and authorization headers
}));


app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
