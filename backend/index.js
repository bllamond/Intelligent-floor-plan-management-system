import app from './src/app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const port = process.env.PORT || 5000;


  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

