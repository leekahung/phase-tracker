import { phaseConnectMembers } from "../utils/phaseMembers.mts";
import { supabase } from "../utils/setupDatabase.mts";
import fetchYouTubeData from "../utils/fetchYouTubeData.mts";

export default async () => {
  await Promise.all(
    phaseConnectMembers.map(async (member) => {
      if (member.status === "active") {
        const results = await fetchYouTubeData(member.channelHandle);
        const { statistics, snippet } = results.items[0];
        const rowData = {
          channel_handle: member.channelHandle,
          generation: member.generation,
          status: member.status,
          subscribers: statistics.subscriberCount,
          viewCount: statistics.viewCount,
          videoCount: statistics.videoCount,
          updated_at: new Date().toISOString(),
          channel_name: snippet.title,
          channel_image: snippet.thumbnails.default.url,
        };
        const { error } = await supabase
          .from("phase_channels")
          .upsert([rowData], { onConflict: "channel_handle" });

        if (error) {
          return new Response(
            JSON.stringify({
              message: "Error updating channel",
              error: error.message,
            }),
            {
              status: 500,
            }
          );
        }

        return new Response(
          JSON.stringify({
            message: "Channel fetched",
          }),
          {
            status: 200,
          }
        );
      }
    })
  );
};
