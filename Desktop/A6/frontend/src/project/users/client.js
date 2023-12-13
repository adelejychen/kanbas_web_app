import axios from "axios";
export const USERS_API = process.env.REACT_APP_API_URL;
//  axios bashURL
axios.defaults.baseURL =  "http://localhost:4000/api/";

export const signin = async (user) => {
  const response = await axios.post(`users/credentials`, user);
    localStorage.setItem("userId", response.data._id);
    localStorage.setItem("role", response.data.role);
  return response.data;
};

export const account = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        throw new Error("User not found");
    }
  const response = await axios.post(`users/${userId}`);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`users/${user._id}`, user);
  // result
 if(response.status!==200)return alert('error')
  alert('update:success')
  return response.data;
};

export const users = async () => {
  const response = await axios.get(`users`);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await axios.delete(`users/${user}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`users`, user);
  return response.data;
};

export const signup = async (user) => {
  const response = await axios.post(`users`, user);
  // result
    if(response.status!==201)return alert('error')
    alert('signup:success')
  return response.data;
};

export const findUserById = async (id) => {

  const response = await axios.get(`users/${id}`);
  return response.data;
};

export const signout = async () => {
  // const response = await axios.post(`${USERS_API}/signout`);
    // clear userId
    localStorage.removeItem("userId");
  return true;
};

export const findUsersByRole = async (role) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};
