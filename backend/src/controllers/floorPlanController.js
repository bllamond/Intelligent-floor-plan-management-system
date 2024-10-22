import FloorPlan from '../models/FloorPlan.js';

// Get all floor plans
export const getFloorPlans = async (req, res) => {
  try {
    const floorPlans = await FloorPlan.find({});
    res.json(floorPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching floor plans', error });
  }
};

// Create a new floor plan
export const createFloorPlan = async (req, res) => {
  const { name, description, seats, rooms, createdBy, modifiedBy } = req.body; // Destructure modifiedBy from req.body
  const newFloorPlan = new FloorPlan({
    name,
    description,
    seats,
    rooms,
    createdBy,
    modifiedBy,
  });
  
  console.log('req');
  try {
    await newFloorPlan.save();
    console.log('req1');
    res.status(201).json(newFloorPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error creating floor plan', error });
  }
}; 



export const updateFloorPlan = async (req, res) => {
  console.log('update');
  const { id } = req.params;
  const { name, description, seats, rooms, modifiedBy, version } = req.body;
  
  try {
    // Find the current floor plan
    const currentFloorPlan = await FloorPlan.findById(id);
    
    if (!currentFloorPlan) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }
    
    console.log('update1');
    console.log(currentFloorPlan.version);
    console.log(version);

    // Check for version conflict
    if (currentFloorPlan.version !== version) {
      return res.status(409).json({
        message: 'Conflict detected. The floor plan has been modified since you last fetched it.',
        currentVersion: currentFloorPlan.version,
      });
    }
    console.log('update2');
    // Prepare changes for logging
    const changes = {};
    if (name && name !== currentFloorPlan.name) changes.name = { old: currentFloorPlan.name, new: name };
    if (description && description !== currentFloorPlan.description) changes.description = { old: currentFloorPlan.description, new: description };
    if (seats) changes.seats = { old: currentFloorPlan.seats, new: seats };
    if (rooms) changes.rooms = { old: currentFloorPlan.rooms, new: rooms };
    
    console.log('update3');
    // Update the floor plan
    currentFloorPlan.name = name || currentFloorPlan.name;
    currentFloorPlan.description = description || currentFloorPlan.description;
    currentFloorPlan.seats = seats || currentFloorPlan.seats;
    currentFloorPlan.rooms = rooms || currentFloorPlan.rooms;
    currentFloorPlan.modifiedBy = modifiedBy;
    currentFloorPlan.modifiedAt = Date.now();
    currentFloorPlan.version += 1;
    
    console.log('update3');
    // Log the changes
    currentFloorPlan.changeLog.push({
      modifiedAt: new Date(),
      modifiedBy,
      changes,
    });

    // Save the updated floor plan
    await currentFloorPlan.save();
    console.log('update4');
    res.status(200).json(currentFloorPlan);
    console.log('update5');
  } catch (error) {
    res.status(500).json({ message: 'Error updating floor plan', error });
  }
};



export const getFloorPlanById = async (req, res) => {
  const { id } = req.params;

  try {
    const floorPlan = await FloorPlan.findById(id);

    if (!floorPlan) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }

    res.status(200).json(floorPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching floor plan', error });
  }
};

export const deleteFloorPlanById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the floor plan
    const deletedFloorPlan = await FloorPlan.findByIdAndDelete(id);

    if (!deletedFloorPlan) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }

    res.status(200).json({ message: 'Floor plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting floor plan', error });
  }
}
