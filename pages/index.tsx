import useSWR from 'swr';
import { useState, useEffect } from 'react';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { PokemonListItem } from '@/types/pokemon';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (router.isReady) {
      setPage(Number(router.query.page) || 1);
    }
  }, [router.isReady, router.query.page]);

  const { data, error, isLoading } = useSWR(
    searchQuery.length >= 3
      ? `/api/pokemon?search=${searchQuery}`
      : `/api/pokemon?offset=${offset}&limit=${limit}`
  );

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await router.push({
      pathname: '/',
      query: { page: newPage }
    }, undefined, { shallow: true });
  };

  if (error) return (
    <div className="text-center py-8 text-red-500">
      Failed to load Pokemon data
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Pokédex</h1>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.results?.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Pokémon out of range <br />
              <Link
                href={{
                  pathname: '/',
                  query: { page: 1 }
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                ← Back
              </Link>
            </div>
          ) : (
            data?.results?.map((pokemon: PokemonListItem) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          )}
        </div>
      )}

      {!searchQuery && data?.count && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.count / limit)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}