import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';

import '@/app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false, // Optional: verhindert Revalidierung beim Fokuswechsel
        dedupingInterval: 10000, // Optional: dedupliziert Anfragen innerhalb von 10 Sekunden
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;