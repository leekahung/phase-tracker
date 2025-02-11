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
  channel_handle: string;
  generation: string;
  status: 'active' | 'retired';
  id: number;
  subscribers: number;
  channel_image: string;
  channel_name: string;
  updated_at: string;
  viewCount: number;
  videoCount: number;
}

export type { IChannelStats, IChannelResponse, IMemberInfo };
