import * as React from "react";

import { cn } from "@/renderer/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "flex w-full rounded-md border text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "min-h-[80px] px-3 py-2 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
