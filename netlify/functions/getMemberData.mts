import { supabase } from '../utils/setupDatabase.mts';

export default async (event: {
  method: string;
  json: () => PromiseLike<{ channelId: unknown }> | { channelId: unknown };
}) => {
  if (event.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
    });
  }

  const { channelId } = await event.json();

  const { data, error } = await supabase
    .from('member_data')
    .select('*')
    .eq('channel_id', channelId)
    .order('date_collected', { ascending: false })
    .limit(14);

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
