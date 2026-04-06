function snakeCaseToCamel(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key.replace(/_[a-z]/g, (letter) => `${letter.toUpperCase().replace('_', '')}`),
      value,
    ])
  );
}

async function fetchAndTransform<T>(url: string, options?: RequestInit): Promise<T[]> {
  const response = await fetch(url, options);
  const results = await response.json();
  return results.map((item: Record<string, unknown>) => snakeCaseToCamel(item) as T);
}

export { fetchAndTransform };
export default snakeCaseToCamel;
