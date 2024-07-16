export interface IProxyChainStats {
  srcTxBytes: number;
  srcRxBytes: number;
  trgTxBytes: number;
  trgRxBytes: number;
}

export interface IProxyChainRequest {
  proxyId: string;
  id: number;
  url: string;
  stats: IProxyChainStats;
}
