export const useFetch = async <B = unknown, D = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: B
) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data: D & { message: string } = await response.json();

  return {
    response,
    data
  };
};