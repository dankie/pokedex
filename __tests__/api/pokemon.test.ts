import { createMocks } from 'node-mocks-http';
import pokemonHandler from '@/pages/api/pokemon';

describe('/api/pokemon', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  const createMockRequest = (searchTerm: string) => {
    return createMocks({
      method: 'GET',
      query: { search: searchTerm },
    });
  };

  const mockPokemonResponse = (pokemonList: Array<{ name: string }>) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: pokemonList })
    });
  };

  const samplePokemonList = [
    { name: 'pikachu' },
    { name: 'raichu' },
    { name: 'pidgey' }
  ];

  it('returns error when search term is too short', async () => {
    const { req, res } = createMockRequest('pi');

    await pokemonHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Search term must be at least 3 characters long'
    });
  });

  it('returns filtered pokemon list', async () => {
    mockPokemonResponse(samplePokemonList);
    const { req, res } = createMockRequest('pikachu');

    await pokemonHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data['results']).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.stringContaining('pikachu')
      })
    ]));
  });

  it('returns error for non existing pokemon', async () => {
    mockPokemonResponse(samplePokemonList);
    const { req, res } = createMockRequest('non-existing-pokemon');

    await pokemonHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data).toEqual(expect.objectContaining({
      error: expect.stringContaining('not found')
    }));
  });
});