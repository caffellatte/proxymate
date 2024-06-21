import { z } from "zod";

export type State = "active" | "inactive" | "invalid";

export interface IProxy {
  id: number;
  name: string;
  description: string;
  port: number;
  state: State;
  proxy_host: string;
  proxy_port: number;
  // TODO: type guard for authentication
  authentication: {
    authentication?: boolean;
    username?: string;
    password?: string;
  };
}

/**
 * Create
 */

export const proxyCreateSchema = z.object({
  name: z.string().min(1, { message: "Name field is required" }),
  description: z.string().optional(),
  port: z
    .union([
      z.coerce
        .number({
          message: "Port must be a number",
        })
        .int({
          message: "Port must be a whole number",
        })
        .positive({
          message: "Port must be positive",
        })
        .min(1025, { message: "Port must be more than 1025" })
        .max(65535, { message: "Port must be less than 655355" }),
      z.literal(""),
    ])
    .refine(
      (proxy_port) => {
        if (proxy_port === "") {
          return false;
        }
        return true;
      },
      {
        message: "Port field is required",
        path: [""],
      }
    ),
  proxy_host: z.string().min(4, { message: "Host field is required" }),
  proxy_port: z
    .union([
      z.coerce
        .number({
          message: "Proxy port must be a number",
        })
        .int({
          message: "Proxy port must be a whole number",
        })
        .positive({
          message: "Proxy port must be positive",
        })
        .min(1025, { message: "Proxy port must be more than 1025" })
        .max(65535, { message: "Proxy port must be less than 65535" }),
      z.literal(""),
    ])
    .refine(
      (proxy_port) => {
        if (proxy_port === "") {
          return false;
        }
        return true;
      },
      {
        message: "Proxy port field is required",
        path: [""],
      }
    ),
  authentication: z
    .object({
      authentication: z.boolean().optional(),
      username: z.string().optional(),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.authentication) {
          if (data.username === "") {
            return false;
          }
        }
        return true;
      },
      {
        message: "Username field is required",
        path: ["username"],
      }
    )
    .refine(
      (data) => {
        if (data.authentication) {
          if (data.password === "") {
            return false;
          }
        }
        return true;
      },
      {
        message: "Password field is required",
        path: ["password"],
      }
    ),
});

export type ProxyCreateFormSchema = z.infer<typeof proxyCreateSchema> & {
  proxyCreateError: string;
};
