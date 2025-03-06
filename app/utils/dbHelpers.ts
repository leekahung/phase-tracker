function snakeCaseToCamel(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [
        key.replace(/_[a-z]/g, (letter) => `${letter.toUpperCase().replace('_', '')}`),
        value,
      ];
    })
  );
}

export default snakeCaseToCamel;
