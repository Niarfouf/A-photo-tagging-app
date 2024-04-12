import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gentle-wax-tamarillo.glitch.me/' + url, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};
export default useFetchData;
