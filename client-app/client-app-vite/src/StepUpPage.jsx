import { useIsSteppedUp, useStepUp } from "@frontegg/react";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

/**
 * Used for testing step up
 * @param props.initialRenderQueryParams query params including the maxAge if exists 
 */
export const StepUpPage = ({ initialRenderQueryParams }) => {
  const maxAgeQueryParam = initialRenderQueryParams.maxAge;
  const maxAgeOptions = maxAgeQueryParam === undefined ? {} : { maxAge: +maxAgeQueryParam };
  const isSteppedUp = useIsSteppedUp(maxAgeOptions);
  const stepUp = useStepUp();

  return (
    <div>
      { isSteppedUp ? <h1 className='stepped-up-user'>Honey, you are stepped up!</h1> : <h1 className='not-stepped-up-user'>You are not stepped up</h1> }
      { !isSteppedUp && <button className='step-up-button' onClick={() => stepUp(maxAgeOptions)}>Step up</button> }

      <Box mt={2}>
        <Link to='/'>
          Home
        </Link>
      </Box>      
    </div>
  );
};
