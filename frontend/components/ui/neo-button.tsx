import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NeoButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "border-2 border-white/20 shadow-neo",
        "hover:translate-x-[-2px]",
        "hover:translate-y-[-2px]",
        "hover:shadow-neo-lg",
        "active:translate-x-[4px]",
        "active:translate-y-[4px]",
        "active:shadow-none",
        "transition-all duration-150",
        className,
      )}
      {...props}
    />
  );
}
