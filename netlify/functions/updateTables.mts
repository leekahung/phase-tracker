import { phaseConnectMembers } from '../utils/phaseMembers.mts';
import { supabase } from '../utils/setupDatabase.mts';
import fetchYouTubeData from '../utils/fetchYouTubeData.mts';

export default async () => {
  const errors: { member: string; error: string }[] = [];

  await Promise.all(
    phaseConnectMembers.map(async (member) => {
      if (member.status === 'active') {
        const results = await fetchYouTubeData(member.channelHandle);
        const { statistics, snippet } = results.items[0];
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
        };
        const { error } = await supabase
          .from('phase_channels')
          .upsert([rowData], { onConflict: 'channelHandle' });

        if (error) {
          errors.push({ member: member.channelHandle, error: error.message });
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
