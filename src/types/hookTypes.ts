import { IMemberInfo } from './dataTypes';

interface IUseChannels {
  items: IMemberInfo[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export type { IUseChannels };
