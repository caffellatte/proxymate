export interface IPorts {
  http?: number;
  socks?: number;
}

export type ValidPorts = IPorts &
  (Required<Pick<IPorts, "http">> | Required<Pick<IPorts, "socks">>);

export enum State {
  active = "ACTIVE",
  inactive = "INACTIVE",
  invalid = "INVALID",
}

export interface IProxy {
  id: number;
  name: string;
  description: string;
  host: string;
  ports: ValidPorts;
  state: State;
  username: string;
  password: string;
}
