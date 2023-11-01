export const useFetch = async <D = unknown, B = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: B
) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data: D & { message: string } = !(url.includes('cookies') && method === 'POST') ? await response.json() : response;

  return {
    response,
    data
  };
};