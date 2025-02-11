export default async function fetchYouTubeData(channelHandle: string) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${channelHandle}&key=${process.env.VITE_YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const results = await response.json();
    return results;
  } catch {
    throw new Error("Unable to fetch data");
  }
}
