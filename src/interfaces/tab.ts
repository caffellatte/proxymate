import { z } from "zod";

export interface ITab {
  id: number;
  url: string;
}

export interface IViewSize {
  width: number;
  height: number;
  topOffset: number;
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
