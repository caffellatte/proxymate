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
      .min(4, { message: "This field is required (min 4 characters)" }),
    description: z.string().optional(),
    host: z
      .string({
        required_error: "This field is required (min 4 characters)",
        invalid_type_error: "This field is required (min 4 characters)",
      })
      .min(4, { message: "This field is required (min 4 characters)" }),
    ports: z.object({
      port_http: z
        .number()
        .min(1, { message: "This field is required (min 1 digit)" })
        .max(5, { message: "This field is required (max 5 digits)" })
        .optional(),
      port_socks: z
        .number()
        .min(1, { message: "This field is required (min 1 digit)" })
        .max(5, { message: "This field is required (max 5 digits)" })
        .optional(),
    }),
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.ports.port_http === undefined ||
        data.ports.port_socks === undefined
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Specify at least one port",
      path: ["ports"],
    },
  );

export type ProxyCreateFormSchema = z.infer<typeof proxyCreateSchema> & {
  proxyCreateError: string;
};
