export const getPokemonList = async (offset: number = 0, limit: number = 20) => {
  const response = await fetch(
    `/api/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.json();
};

export const getPokemonDetails = async (nameOrId: string | number) => {
  const response = await fetch(`/api/pokemon/${nameOrId}`);
  return response.json();
};

export const searchPokemon = async (query: string) => {
  const response = await fetch(`/api/pokemon?search=${query}`);
  return response.json();
};