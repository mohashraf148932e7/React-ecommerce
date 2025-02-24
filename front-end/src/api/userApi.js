import axios from "axios";

const baseUrl = "http://localhost:3001/users";

const getAllUsers = async () => axios.get(baseUrl);
const getUserById = async (id) => axios.get(`${baseUrl}/${id}`);
const addUser = async (user) => axios.post(`${baseUrl}`, user);
const updateUser = async (id, user) => axios.put(`${baseUrl}/${id}`, user);
const deleteUser = async (id) => axios.delete(`${baseUrl}/${id}`);

export { getAllUsers, getUserById, addUser, updateUser, deleteUser };
