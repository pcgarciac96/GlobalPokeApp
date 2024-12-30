import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',  // Cabecera común para JSON
  },
});

export const getPokemonList = async (limit: number, offset: number): Promise<any> => {
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

export const getPokemonbyName = async (name: string): Promise<any> => {
  console.log(name);
  
  try {
    const response = await api.get(`/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw new Error('Error al obtener el Pokémon');
  }
};

export default api;
