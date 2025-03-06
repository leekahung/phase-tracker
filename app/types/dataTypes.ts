interface IMemberInfo {
  channelHandle: string;
  channelId: string;
  channelImage: string;
  channelName: string;
  generation: string;
  id: number;
  memberNameEn: string;
  memberNameJp: string;
  status: 'active' | 'retired';
  subscribers: number;
  updatedAt: string;
  videoCount: number;
  viewCount: number;
}

interface IMemberData {
  id: number;
  channelId: string;
  subscribers: number;
  dateCollected: string;
  viewCount: number;
}

export type { IMemberData, IMemberInfo };
