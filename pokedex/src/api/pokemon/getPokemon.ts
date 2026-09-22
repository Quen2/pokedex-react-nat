import { apiFetch} from "@/api/api";

export const getPokemon = async (id: string | string[]) => {
  try {
    const data = await apiFetch(`pokemon/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Pokémon data');
  }
}

export const getPokemons = async (offset: number, limit: number) => {
  try {
    const data = await apiFetch(`pokemon?offset=${offset}&limit=${limit}`);
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch Pokémon list');
  }
}

export const getPokemonDescription = async (id: string | string[]) => {
  try {
    const data = await apiFetch(`pokemon-species/${id}`);
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch Pokemon description')
  }
}