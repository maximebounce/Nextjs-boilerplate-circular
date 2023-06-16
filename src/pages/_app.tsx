import '../styles/global.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';

import { frontendConfig } from '../config/frontendConfig';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SuperTokensWrapper>
      <Component {...pageProps} />
      <Analytics />
    </SuperTokensWrapper>
  );
};

export default MyApp;
