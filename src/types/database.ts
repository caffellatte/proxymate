import { ClassicLevel } from "classic-level";
import { AbstractSublevel } from "abstract-level";
import { AnyJson, IProxy } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILevelDatabase extends ClassicLevel<string, AnyJson> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProxiesDatabase
  extends AbstractSublevel<
    ClassicLevel<string, AnyJson>,
    string | Buffer | Uint8Array,
    string,
    Omit<IProxy, "id" | "state">
  > {}
