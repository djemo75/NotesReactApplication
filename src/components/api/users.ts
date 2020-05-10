import axios from 'axios';
import { userModel } from 'types/userModel';

const REACT_APP_API_URL= 'http://localhost:3005';

export type LoginModel = {
  username: string;
  password: string;
};

export const getUsers = async (): Promise<userModel[]> => {
  const res = await axios.get(`${REACT_APP_API_URL}/users`);
  return res.data;
};

export const getUserById = async (userId: string): Promise<userModel> => {
  const res = await axios.get(`${REACT_APP_API_URL}/users/${userId}`);
  return res.data;
};

export const editUser = async (data: userModel): Promise<void> => {
  await axios.put(`${REACT_APP_API_URL}/users/${data.id}`, data);
};

export const login = async (data: LoginModel): Promise<userModel> => {
  const users = await getUsers();

  const loggedUser = users.find(
    (x) =>
      x.username === data.username && x.password.toString() === data.password
  );
  if (loggedUser) {
    loggedUser.isActive = true;
    await editUser(loggedUser);
    return loggedUser;
  }
  throw new Error('Wrong username or passwrod!');
};

export const getMe = (): userModel | null => {
  const user = localStorage.getItem('loggedUser');
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

export const logout = async (data: userModel): Promise<void> => {
  // eslint-disable-next-line no-param-reassign
  data.isActive = false;
  await editUser(data);
  await localStorage.removeItem('loggedUser');
};

export const register = async (data: userModel): Promise<userModel> => {
  const users = await getUsers();
  const existUsername = users.find((x) => x.username === data.username);
  if (existUsername) {
    throw new Error('Username is used!');
  } else {
    const res = await axios.post(`${REACT_APP_API_URL}/users/`, data);
    return res.data;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${REACT_APP_API_URL}/users/${userId}`);
};
