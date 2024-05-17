'use client';
import Cookies from 'js-cookie';

const fetcher = async (url, options = {}) => {
  const token = Cookies.get('token');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    console.error('Fetch error:', errorDetail);
    throw new Error('An error occurred while fetching the data.');
  }

  return response.json();
};

export default fetcher;
