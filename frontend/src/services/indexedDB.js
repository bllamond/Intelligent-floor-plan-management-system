// indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'FloorPlanDB';
const STORE_NAME = 'floorPlans';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: '_id' });
      }
    },
  });
};

export const saveFloorPlan = async (floorPlan) => {
  const db = await initDB();
  await db.put(STORE_NAME, floorPlan);
};

export const getFloorPlans = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteFloorPlan = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
