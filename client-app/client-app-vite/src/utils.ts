export function getQueryStringParam(name: string, defaultValue = '') {
  document.cookie = '';
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(name);
  console.log('NAME: ---- ' + name);
  console.log('urlParams: ---- ' + urlParams);
  console.log('paramValue: ---- ' + paramValue);

  if (paramValue !== null) {
    localStorage.setItem(name, paramValue);
    return decodeURIComponent(paramValue);
  }

  const storedValue = localStorage.getItem(name);
  if (storedValue !== null) {
    return decodeURIComponent(storedValue);
  }
  const cookieValue = document.cookie
    .split('; ')
    // @ts-ignore
    .find((cookie) => {
      return cookie.startsWith(`${name}=`);
    });
  if (cookieValue !== undefined) {
    const value = cookieValue.split('=')[1];
    localStorage.setItem(name, value);
    return decodeURIComponent(value);
  }

  return defaultValue;
}

/**
 * Used for providing dynamic values from the tests
 * This array includes the relevant query param names to pass to the App component
 */
const RELEVANT_QUERY_PARAM_NAMES = ['maxAge', 'selfService', 'organization', 'sso_config_id'];

/**
 * @returns an object with the relevant query params according to RELEVANT_QUERY_PARAM_NAMES
 */
export function getRelevantQueryParams(): Record<string, string> {
  return RELEVANT_QUERY_PARAM_NAMES.reduce((acc, paramName) => ({
    ...acc,
    [paramName]: getQueryStringParam(paramName),
  }), {});
}
