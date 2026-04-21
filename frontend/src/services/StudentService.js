import axios from 'axios';

const API_URL = 'http://localhost:8080/api/students';

const StudentService = {
  getAllStudents: () => {
    return axios.get(API_URL);
  },

  getStudentById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },

  createStudent: (student) => {
    return axios.post(API_URL, student);
  },

  updateStudent: (id, student) => {
    return axios.put(`${API_URL}/${id}`, student);
  },

  deleteStudent: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },

  searchByName: (name) => {
    return axios.get(`${API_URL}/search/${name}`);
  },

  filterByCourse: (course) => {
    return axios.get(`${API_URL}/filter/course/${course}`);
  }
};

export default StudentService;
