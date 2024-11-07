import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://pokeapi.co/api/v2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const offset = Number(query.offset) || 0;
      const limit = Number(query.limit) || 20;
      const searchQuery = query.search as string;

      try {
        if (searchQuery && searchQuery.length >= 3) {
          // Handling search
          const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
          const data = await response.json();
          const filtered = {results: data.results.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          )};
          if (filtered.results.length === 0) {
            return res.status(400).json({ results: [], error: 'Pokemon not found' });
          }
          return res.status(200).json(filtered);
        } else if (searchQuery && searchQuery.length < 3) {
          return res.status(400).json({ error: 'Search term must be at least 3 characters long' });
        }
     } catch (error) {
        return res.status(400).json({ error: 'Pokemon not found / ' + error });
      }

      try {
        // Normal pagination
        const response = await fetch(
          `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        if (data.results.length === 0) {
          return res.status(400).json({ results: [], error: 'No items found' });
        }
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json({ error: 'Page not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}