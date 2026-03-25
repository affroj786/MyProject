import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '/students';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllStudents = () => api.get('/');

export const getStudentById = (id) => api.get(`/${id}`);

export const createStudent = (student) => api.post('/', student);

export const updateStudent = (id, student) => api.put(`/${id}`, student);

export const deleteStudent = (id) => api.delete(`/${id}`);

export default api;
