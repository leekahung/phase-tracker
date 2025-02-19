interface IChannelStats {
  hiddenSubscriberCount: boolean;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

interface IChannelSnippetThumbnails {
  url: string;
  width: number;
  height: number;
}

interface IChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: Date;
  localized: {
    title: string;
    description: string;
  };
  thumbnails: {
    default: IChannelSnippetThumbnails;
    medium: IChannelSnippetThumbnails;
    high: IChannelSnippetThumbnails;
  };
  country: string;
}

interface IChannelResponseItems {
  etag: string;
  id: string;
  kind: string;
  statistics: IChannelStats;
  snippet: IChannelSnippet;
}

interface IChannelResponse {
  etag: string;
  items: IChannelResponseItems[];
  kind: string;
  pageInfo: {
    resultPerPage: number;
    totalResults: number;
  };
}

interface IMemberInfo {
  channelHandle: string;
  generation: string;
  status: 'active' | 'retired';
  id: number;
  subscribers: number;
  channelImage: string;
  channelName: string;
  updatedAt: string;
  viewCount: number;
  videoCount: number;
  memberNameEN: string;
  memberNameJP: string;
}

export type { IChannelStats, IChannelResponse, IMemberInfo };
