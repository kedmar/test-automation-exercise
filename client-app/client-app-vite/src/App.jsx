import './App.css';
import { useEffect } from 'react';
import { AdminPortal, ContextHolder, useAuth, useLoginWithRedirect } from '@frontegg/react';
import { Route, Routes } from 'react-router-dom';
import { StepUpPage } from './StepUpPage.jsx';
import { HomePage } from './HomePage.jsx';
import SwitchTenant from './SwitchTenant.jsx';
import { getRelevantQueryParams } from './utils';

function App({ initialRenderQueryParams }) {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const { sso_config_id } = getRelevantQueryParams();
  const loginEmbedded = () => {
    window.location.href = 'http://localhost:3000/account/login';
  };

  // Auto-redirect with sso_config_id to test multitenancy SSO tenant routing (FR-T20777)
  useEffect(() => {
    if (!isAuthenticated && sso_config_id) {
      loginWithRedirect({ sso_config_id });
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleClick = () => {
    const { selfService } = getRelevantQueryParams();
    if (selfService) {
      AdminPortal.openHosted();
    } else {
      AdminPortal.show();
    }
  };

  return (
    <div className="App">
      <h1>Frontegg React App</h1>
      <button onClick={() => handleClick({selfService: false})} data-test-id="settings-button">Settings</button>
      {isAuthenticated ? (
        <div data-test-id="profile-display-box">
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <span>User email: {user?.email}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button data-test-id="logout-button" onClick={() => logout()}>
              Click to logout
            </button>
          </div>
          <SwitchTenant/>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect(sso_config_id ? { ssoConfigId: sso_config_id } : undefined)}>Click me to login - hosted</button>
          <div>
            <button onClick={() => loginEmbedded()}>Click me to login - embedded</button>
          </div>
        </div>
      )}

      <Routes>
        <Route path={'/'} exact element={<HomePage />} />
        <Route path={'/payment'} exact element={<StepUpPage initialRenderQueryParams={initialRenderQueryParams} />} />
        <Route path={'*'} element={<>404</>} />
      </Routes>
    </div>
  );
}

export default App;
