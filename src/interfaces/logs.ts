export interface IProxyChainStats {
  srcTxBytes: number;
  srcRxBytes: number;
  trgTxBytes: number;
  trgRxBytes: number;
}

export interface ILogsRecord {
  proxyId: string;
  connectionId: number;
  url: string;
  stats: IProxyChainStats;
  created: number;
  updated: number;
}
