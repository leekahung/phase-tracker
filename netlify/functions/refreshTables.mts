export default async () => {
  await fetch('/.netlify/functions/updateTables');
};

export const config = {
  schedule: '@daily',
};
