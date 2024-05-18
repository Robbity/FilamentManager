import axios from "axios";

const API_URL = "http://localhost:55555/api/filaments";

export const fetchFilament = async (id) => {
  return axios.get(`${API_URL}/${id}`).then((response) => response.data);
};

export const updateFilament = async (id, filamentData) => {
  return axios
    .put(`${API_URL}/${id}`, filamentData)
    .then((response) => response.data);
};
