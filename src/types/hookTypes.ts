import { IMemberInfo } from './dataTypes';

interface IUseChannels {
  members: IMemberInfo[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export type { IUseChannels };
