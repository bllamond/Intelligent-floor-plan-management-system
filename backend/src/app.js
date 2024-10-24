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
app.use('/api/meetingRooms/recommendations', async (req, res) => {
    const { floorId, participants } = req.query;
    console.log(floorId);
    try {
        const query = { availability: true, capacity: { $gte: participants } };
        if (floorId) {
            query.floorPlanId = floorId; // Filter by floor if specified
        }
        const recommendedRooms = await MeetingRoom.find(query).limit(3); // Get top 3
        res.status(200).json(recommendedRooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recommendations.', error });
    }
});



// app.use(errorHandler);

export default app;
