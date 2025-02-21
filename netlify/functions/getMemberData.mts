import { supabase } from '../utils/setupDatabase.mts';

export default async (event) => {
  if (event.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
  }

  const { channelId } = await event.json();

  const { data, error } = await supabase
    .from('subscriber_count')
    .select('*')
    .eq('channelId', channelId);

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
