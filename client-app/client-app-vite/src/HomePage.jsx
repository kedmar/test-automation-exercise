import { useAuth } from '@frontegg/react';
import { FeatureFlagTest } from './FeatureFlagTest.jsx';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <FeatureFlagTest />}

      <Box mt={2}>
        <Link to="/payment">
          Payment
        </Link>
      </Box>
    </>
  );
};