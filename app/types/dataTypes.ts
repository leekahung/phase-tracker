interface IMemberInfo {
  channelHandle: string;
  channelId: string;
  channelImage: string;
  channelName: string;
  generation: string;
  id: number;
  memberNameEn: string;
  memberNameJp: string;
  status: "active" | "retired";
  subscribers: number;
  updatedAt: string;
  videoCount: number;
  viewCount: number;
}

interface IMemberData {
  channelId: string;
  subscribers: number;
  dateCollected: string;
}
