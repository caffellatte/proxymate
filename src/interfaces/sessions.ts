export interface ISession {
  id: string;
  name: string;
  type: "persistent" | "inmemory";
}
