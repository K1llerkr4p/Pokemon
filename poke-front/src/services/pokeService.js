import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const getPokemons = async () => {
  const response = await axios.get(`${API_BASE}/pokemon`);
  return response.data.results;
};
