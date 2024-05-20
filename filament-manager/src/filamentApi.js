import axios from "axios";

// Update the API_URL to point to your Heroku backend
const API_URL =
  "https://filament-manager-backend-ef6b941495fd.herokuapp.com/api/filaments";

export const fetchFilament = async (id) => {
  return axios.get(`${API_URL}/${id}`).then((response) => response.data);
};

export const updateFilament = async (id, filamentData) => {
  return axios
    .put(`${API_URL}/${id}`, filamentData)
    .then((response) => response.data);
};
