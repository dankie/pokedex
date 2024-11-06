# pokedex

pokedex is a simple pokedex app built with react and typescript. It's using a SPA architecture and an API to fetch data written in Next.js.

## Get it started

Open a terminal and follow these steps:

- Clone the repository
- Install dependencies
- Start the development server

like so:

```bash
npm install
npm run dev
```

## Usage

Once the development server is running, you can access the app at localhost:3000. You'll see the main page of the app showing a list of pokemons. On the top right you'll see a search bar where you can search for a pokemon by name. Please note, that you have to enter at least 3 characters to get a result. At the bottom of the page you'll see a pagination component to step forward and backward through the list of pokemons. The pagination is based on the API response and not on the client side. This means, that when clicking on the next or previous button, the app will fetch the next or previous page of the API response. Please note, that the pagination is intentionally not available on search results.

When clicking on a pokemon, you'll be shown a detail page of the respective pokemon showing more information about it. There, you can hit the back link in the top left corner to get back to the list of pokemons.

Have fun!

## Architecture

### Backend

The backend is a simple API written in Next.js. It's purpose is to fetch data from the Pokemon API and to provide it to the frontend. It has two endpoints:

- `/api/pokemons` - This endpoint fetches data from the Pokemon API and provides it to the frontend. It has several query parameters to filter the data: It can take a parameter `search` to search for a pokemon by name OR two parameters `offset` and `limit` to get a specific page of the API response and number of pokemons shown per page. To reduce the amount of data sent, the API filters out the fields that are not needed.
- `/api/pokemons/:id` - This endpoint fetches a single pokemon by its ID and provides it to the frontend.

### Frontend

The app is built with as an SPA. When starting the app, it fetches the data for 20 pokemons from the Backend API and shows them to the user. When clicking on a pokemon, the app will fetch data for the detail page of the respective pokemon and replace the current page with it. When clicking on the back link, the app will replace the current page with the list of pokemons.
