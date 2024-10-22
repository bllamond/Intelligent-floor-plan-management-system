import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getFloorPlans = () => axios.get(`${API_URL}/floorplans`);
export const createFloorPlan = (data) => axios.post(`${API_URL}/floorplans`, data);
