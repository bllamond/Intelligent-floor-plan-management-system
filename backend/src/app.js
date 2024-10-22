import express from 'express';
import cors from 'cors';
import './utils/database.js';
// import errorHandler from './middleware/errorHandler.js';
import floorPlanRoutes from './routes/floorPlanRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/floorplans', floorPlanRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/users', userRoutes);

// Error handling middleware
// app.use(errorHandler);

export default app;
