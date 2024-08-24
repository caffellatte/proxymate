import { z } from "zod";

export interface ITab {
  id: number;
  url: string;
}

/**
 * searchBarSchema
 */

export const searchBarSchema = z.object({
  address: z
    .string()
    .min(1, { message: "Enter a website address or search phrase" }),
});

export type SearchBarFormSchema = z.infer<typeof searchBarSchema> & {
  searchBarError: string;
};
