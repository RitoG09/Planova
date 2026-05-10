import { cn } from "@/lib/utils";

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NeoCard({ className, ...props }: NeoCardProps) {
  return (
    <div
      className={cn(
        "rounded-neo border-2 border-white/20 bg-card shadow-neo",
        className,
      )}
      {...props}
    />
  );
}
