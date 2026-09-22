const BASE_URL = 'https://pokeapi.co/api/v2';

export const apiFetch = async (path: string) => {
  const response = await fetch(`${BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
}