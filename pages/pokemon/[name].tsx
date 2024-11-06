import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';

import '@/app/globals.css';

export default function PokemonPage() {
  const router = useRouter();
  const { name } = router.query;

  const { data: pokemon, error, isLoading } = useSWR(
    name ? `/api/pokemon/${name}` : null
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8 text-center text-red-500">
      Failed to load Pokemon details
    </div>
  );

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-48 w-48 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!pokemon) return null;
  if (!pokemon.sprites) return (
    <div className="container mx-auto px-4 py-8 text-center text-red-500">
      Failed to load Pokemon details
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <Link
          href={{
            pathname: '/',
            query: { page: router.query.page }
          }}
          className="absolute left-6 top-6 text-blue-500 hover:text-blue-700"
        >
          ← Back
        </Link>

        <img
          alt={pokemon.name}
          src={pokemon.sprites.front_default}
          className="w-48 h-48 mx-auto"
        />
        <h1 className="text-3xl font-bold text-center capitalize mb-4">
          {pokemon.name}
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p>Species: {pokemon.species.name}</p>
            <p>Weight: {pokemon.weight / 10}kg</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Types</h2>
            <div className="flex gap-2">
              {pokemon.types.map((type: any) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 rounded-full bg-gray-200"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          {pokemon.stats.map((stat: any) => (
            <div key={stat.stat.name} className="mb-2">
              <div className="flex justify-between">
                <span className="capitalize">{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
