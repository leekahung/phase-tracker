import { supabase } from '../utils/setupDatabase.mts';
import { dbResponse } from '../utils/dbResponse.mts';

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

  return dbResponse({ data, error });
};
