import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPokemonDetails } from '@/services/pokemonApi';
import { PokemonDetails } from '@/types/pokemon';
import { PokemonListItem } from '@/types/pokemon';
import { useRouter } from 'next/router';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getPokemonDetails(pokemon.name);
      setDetails(data);
    };
    fetchDetails();
  }, [pokemon.name]);

  if (!details) return <div>Loading...</div>;

  return (
    <Link href={`/pokemon/${pokemon.name}?page=${router.query.page}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <img
          src={details.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h2 className="text-xl font-semibold text-center capitalize">
          {pokemon.name}
        </h2>
      </div>
    </Link>
  );
}