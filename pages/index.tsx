import useSWR from 'swr';
import { useState } from 'react';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { PokemonListItem } from '@/types/pokemon';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(() =>
    Number(router.query.page) || 1
  );
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 20;
  const offset = (page - 1) * limit;

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
  console.log('Page: ', router.query.page);
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
          {data?.results?.map((pokemon: PokemonListItem) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
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