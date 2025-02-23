const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

async function fetchData<T>(url: string, params: RequestInit = {}): Promise<T> {
  try {
    const baseHeaders = {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    };

    const headers = {
      ...baseHeaders,
      ...(params.headers || {}),
    };

    const finalParams = {
      ...params,
      headers,
    };

    const response = await fetch(`${supabaseUrl}${url}`, finalParams);

    if (!response.ok) {
      throw new Error(`Ошибка при запросе данных: ${response.statusText}`);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    console.error('Произошла ошибка:', error);
    return [] as T;
  }
}

export { fetchData };
