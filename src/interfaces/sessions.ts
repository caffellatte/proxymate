import { z } from "zod";

const SESSION_TYPES = ["persistent", "inmemory"] as const;

export type SessionTypes = typeof SESSION_TYPES;
export type SessionType = SessionTypes[number];

export interface ISession {
  id: string;
  name: string;
  type: SessionType;
}

/**
 * sessionSchema
 */

export const sessionSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Enter a website address or search phrase" }),
  type: z
    .union([
      z.enum(SESSION_TYPES, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorMap: (issue, ctx) => {
          return { message: "Type field is required" };
        },
      }),
      z.literal(""),
    ])
    .refine(
      (type) => {
        if (type === "") {
          return false;
        }
        return true;
      },
      {
        message: "Type field is required",
        path: [""],
      }
    ),
});

export type SessionFormSchema = z.infer<typeof sessionSchema> & {
  sessionError: string;
};
