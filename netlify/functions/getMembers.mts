import { supabase } from '../utils/setupDatabase.mts';

export default async () => {
  const { data, error } = await supabase.from('phase_members').select('*');

  if (error) {
    return new Response(
      JSON.stringify({
        message: 'Error fetching from database',
        error: error.message,
      }),
      { status: 500 }
    );
  }
  return new Response(JSON.stringify(data), { status: 200 });
};
