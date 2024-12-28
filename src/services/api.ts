import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',  // Cabecera común para JSON
  },
});

export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<any> => {
  try {
    const response = await api.get(`/pokemon`, {
      params: {
        limit,
        offset,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
