export interface IPorts {
  http?: number;
  socks?: number;
}

export type ValidPorts = IPorts &
  (Required<Pick<IPorts, "http">> | Required<Pick<IPorts, "socks">>);

export type State = "active" | "inactive" | "invalid";

export interface IProxy {
  id: number;
  name: string;
  description: string;
  host: string;
  ports: ValidPorts;
  state: State;
  username?: string;
  password?: string;
}

import { z } from "zod";

/**
 * Create
 */

export const proxyCreateSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name field is required (min 4 characters)" }),
    description: z.string().optional(),
    host: z
      .string()
      .min(4, { message: "Host field is required (min 4 characters)" }),
    ports: z.object({
      port_http: z
        .union([
          z.coerce
            .number({
              message: "must be a number",
            })
            .int({
              message: "must be a whole number",
            })
            .positive({
              message: "must be positive",
            })
            .min(1, { message: "HTTP port from 1 to 65535 are available" })
            .max(65535, { message: "HTTP port from 1 to 65535 are available" }),
          z.literal(""),
        ])
        .optional(),
      port_socks: z
        .union([
          z.coerce
            .number({
              message: "must be a number",
            })
            .int({
              message: "must be a whole number",
            })
            .positive({
              message: "must be positive",
            })
            .min(1, { message: "SOCKS5 port from 1 to 65535 are available" })
            .max(65535, {
              message: "SOCKS5 port from 1 to 65535 are available",
            }),
          z.literal(""),
        ])
        .optional(),
    }),
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.ports.port_http !== "" || data.ports.port_socks !== "") {
        return true;
      }
      return false;
    },
    {
      message: "Specify at least one port (HTTP or SOCKS5)",
      path: ["ports"],
    },
  );

export type ProxyCreateFormSchema = z.infer<typeof proxyCreateSchema> & {
  proxyCreateError: string;
};
