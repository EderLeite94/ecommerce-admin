export const fetchAPI = async <T = unknown>(
  useBaseUrl: boolean = true,
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  const url = useBaseUrl ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${input}` : input;
  const data = await fetch(url, init);
  const result = await data.json();

  return result as T;
};