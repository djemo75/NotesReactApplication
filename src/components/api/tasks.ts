import axios from 'axios';
import { taskModel } from 'types/taskModel.';

const REACT_APP_API_URL = 'http://localhost:3005';

export const getTasksByUserId = async (userId: number): Promise<taskModel[]> => {
  const res = await axios.get(`${REACT_APP_API_URL}/tasks?userId=${userId}`);
  return res.data;
};
