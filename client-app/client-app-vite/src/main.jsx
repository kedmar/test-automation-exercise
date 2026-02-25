import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import './index.css';
import { FronteggProvider } from '@frontegg/react';
import { getQueryStringParam, getRelevantQueryParams } from './utils';


const tenantResolver = () => {
  const urlQueryParams = new URLSearchParams(window.location.search);
  const organization = urlQueryParams.get('organization');
  return { tenant: organization };
};

const contextOptions = {
  baseUrl: getQueryStringParam('baseUrl', 'https://fronteggers.stg.frontegg.com'),
  clientId: getQueryStringParam('clientId', '3e17e4b7-629c-4f76-8230-9923c2098af3'),
  tenantResolver,
};

const appId = getQueryStringParam('appId', null);
if (appId != null) {
  contextOptions['appId'] = appId;
}

const authOptions = {
  keepSessionAlive: true,
};

const themeOptions = {};

const direction = getQueryStringParam('direction', 'ltr');
if (direction != null) {
  themeOptions['direction'] = direction;
}


const FronteggWrapper = () => {
  const location = useLocation();
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const currentOrg = params.get('organization');
      const isHostedParam = getQueryStringParam('isHosted', 'true') === 'true';
      if (currentOrg) {
        sessionStorage.setItem('fronteggOrganization', currentOrg);
        // Redirect root to account/login when organization param exists
        if (isHostedParam && !window.location.pathname.startsWith('/account/login')) {
          const url = new URL(window.location.href);
          url.pathname = '/account/login';
          window.history.replaceState(null, '', url.toString());
        }
      } else {
        const alias = sessionStorage.getItem('fronteggOrganization');
        const shouldEmbed = !isHostedParam || (typeof import.meta !== 'undefined' && (import.meta.env?.MODE || '').toLowerCase() === 'embedded');
        if (shouldEmbed && alias) {
          const url = new URL(window.location.href);
          url.searchParams.set('organization', alias);
          window.history.replaceState(null, '', url.toString());
        }
      }
    } catch {}
  }, [location.pathname, location.search]);

  return (
    <FronteggProvider
      contextOptions={contextOptions}
      hostedLoginBox={getQueryStringParam('isHosted', 'true') === 'true'}
      authOptions={authOptions}
      entitlementsOptions={{ enabled: true }}
      themeOptions={themeOptions}
    >
      <App initialRenderQueryParams={getRelevantQueryParams()} />
    </FronteggProvider>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <FronteggWrapper />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);

