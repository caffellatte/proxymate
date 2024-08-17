// https://github.com/microsoft/TypeScript/issues/1897

type JsonPrimitive = boolean | number | string | null;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface JsonArray extends Array<AnyJson> {}

interface JsonMap {
  [key: string]: AnyJson;
}

export type AnyJson = JsonPrimitive | JsonArray | JsonMap;
