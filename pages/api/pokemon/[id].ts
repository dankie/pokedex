import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://pokeapi.co/api/v2';
const keysToKeep = ['id', 'name', 'height', 'weight', 'types', 'abilities', 'stats', 'sprites', 'species'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        const data = await response.json();
        const filteredData = keysToKeep.reduce((acc: any, key: string) => {
          acc[key] = data[key];
          return acc;
        }, {});
        return res.status(200).setHeader('Cache-Control', 'max-age=3600').json(filteredData);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch Pokemon details' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}