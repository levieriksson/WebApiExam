// src/utils/fetcher.js
import Cookies from 'js-cookie';

const fetcher = async (url, options = {}) => {
  const token = Cookies.get('token');
  const headers = {
    'Authorization': token ? `Bearer ${token}` : '',
    ...options.headers
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    console.error('Fetch error:', errorDetail);
    throw new Error('An error occurred while fetching the data.');
  }

  return response.json();
};

export default fetcher;
