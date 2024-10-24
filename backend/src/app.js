import express from 'express';
import cors from 'cors';
import './utils/database.js';

import floorPlanRoutes from './routes/floorPlanRoutes.js';
import meetingRoomRoutes from './routes/meetingRoomRoutes.js';
import recommendationsRoutes from './routes/recommendationsRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/floorplans', floorPlanRoutes);
app.use('/api/meetingRooms', meetingRoomRoutes);
app.use('/api/recommendations', recommendationsRoutes);


// app.use(errorHandler);

export default app;
