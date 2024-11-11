export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  moves: {
    move: {
      name: string;
    };
  }[];
}