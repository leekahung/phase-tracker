export default function snakeToCamelCase(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key.replace(/_([a-z])/g, (_, letter) => `${letter.toUpperCase()}`), value];
    })
  );
}
