import { phaseConnectMembers } from '../utils/phaseMembers.mts';
import { supabase } from '../utils/setupDatabase.mts';
import fetchYouTubeData from '../utils/fetchYouTubeData.mts';

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
          memberNameEN: member.memberNameEN,
          memberNameJP: member.memberNameJP,
          subscribers: statistics.subscriberCount,
          viewCount: statistics.viewCount,
          videoCount: statistics.videoCount,
          updatedAt: new Date().toISOString(),
          channelName: snippet.title,
          channelImage: snippet.thumbnails.default.url,
          channelId: id,
        };
        const { error: channelsError } = await supabase
          .from('phase_channels')
          .upsert([rowData], { onConflict: 'channelHandle' });

        if (channelsError) {
          errors.push({ member: member.channelHandle, error: channelsError.message });
        }

        const rowDataSubscibers = {
          channelId: id,
          dateCollected: rowData.updatedAt.split('T')[0],
          subscribers: rowData.subscribers,
        };

        const { error: countError } = await supabase
          .from('subscriber_count')
          .upsert([rowDataSubscibers], { onConflict: 'dateCollected,channelId' });

        if (countError) {
          errors.push({ member: member.channelHandle, error: countError.message });
        }
      } else {
        const { error } = await supabase
          .from('phase_channels')
          .delete()
          .eq('channelHandle', member.channelHandle);

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
