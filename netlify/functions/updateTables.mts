import { phaseConnectMembers } from '../utils/phaseMembers.mts';
import { supabase } from '../utils/setupDatabase.mts';
import fetchYouTubeData from '../utils/fetchYouTubeData.mts';

function camelToSnakeCase(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`), value];
    })
  );
}

export default async () => {
  const errors: { member: string; error: string }[] = [];

  await Promise.all(
    phaseConnectMembers.map(async (member) => {
      if (member.status === 'active') {
        const results = await fetchYouTubeData(member.channelHandle);
        const { statistics, snippet, id } = results.items[0];
        const rowData = {
          channelHandle: member.channelHandle,
          generation: member.generation,
          status: member.status,
          memberNameEn: member.memberNameEn,
          memberNameJp: member.memberNameJp,
          subscribers: statistics.subscriberCount,
          view_count: statistics.viewCount,
          videoCount: statistics.videoCount,
          updatedAt: new Date().toISOString(),
          channelName: snippet.title,
          channelImage: snippet.thumbnails.default.url,
          channelId: id,
        };
        const { error: channelsError } = await supabase
          .from('phase_members')
          .upsert([camelToSnakeCase(rowData)], { onConflict: 'channel_id' });

        if (channelsError) {
          errors.push({ member: member.channelHandle, error: channelsError.message });
        }

        const rowDataSubscibers = {
          channelId: id,
          dateCollected: rowData.updatedAt.split('T')[0],
          subscribers: rowData.subscribers,
          viewCount: rowData.view_count,
        };

        const { error: countError } = await supabase
          .from('member_data')
          .upsert([camelToSnakeCase(rowDataSubscibers)], {
            onConflict: 'date_collected,channel_id',
          });

        if (countError) {
          errors.push({ member: member.channelHandle, error: countError.message });
        }
      } else {
        const { error } = await supabase
          .from('phase_members')
          .delete()
          .eq('channel_handle', member.channelHandle);

        if (error) {
          errors.push({ member: member.channelHandle, error: error.message });
        }
      }
    })
  );

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({
        message: 'Unable to update channel',
        errors,
      }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ message: 'Channels updated successfully' }), {
    status: 200,
  });
};
