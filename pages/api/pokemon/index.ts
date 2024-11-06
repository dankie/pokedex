import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://pokeapi.co/api/v2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const offset = Number(query.offset) || 0;
        const limit = Number(query.limit) || 20;
        const searchQuery = query.search as string;

        if (searchQuery && searchQuery.length >= 3) {
          // Handling search
          const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
          const data = await response.json();
          const filtered = {results: data.results.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          )};
          return res.status(200).json(filtered);
        }

        // Normal pagination
        const response = await fetch(
          `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch Pokemon' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}