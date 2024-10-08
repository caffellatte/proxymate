import { ClassicLevel } from "classic-level";
import { AbstractSublevel } from "abstract-level";
import { AnyJson, IProxy, ILogsRecord, ISession } from "@/interfaces";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILevelDatabase extends ClassicLevel<string, AnyJson> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProxiesDatabase
  extends AbstractSublevel<
    ClassicLevel<string, AnyJson>,
    string | Buffer | Uint8Array,
    string,
    Omit<IProxy, "id">
  > {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILogsDatabase
  extends AbstractSublevel<
    ClassicLevel<string, AnyJson>,
    string | Buffer | Uint8Array,
    string,
    Omit<ILogsRecord, "proxyId" | "connectionId">
  > {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISessionsDatabase extends ClassicLevel<string, ISession> {}
