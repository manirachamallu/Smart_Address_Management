import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export function PhoneHeader({
  title,
  onBack,
  right,
  subtitle,
}: {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="px-5 pt-3 pb-4 sticky top-0 z-20 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="h-9 w-9 rounded-full glass flex items-center justify-center -ml-1"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-[17px] font-semibold leading-tight truncate">{title}</h1>
            {subtitle && (
              <p className="text-[12px] text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>
        {right}
      </div>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[12px] font-semibold tabular-nums">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/40" />
        <span className="ml-2">100%</span>
      </span>
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full h-12 rounded-2xl bg-orange-gradient text-primary-foreground font-semibold text-[15px]",
        "shadow-glow active:scale-[0.98] transition-transform disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full h-12 rounded-2xl glass text-foreground font-semibold text-[15px]",
        "active:scale-[0.98] transition-transform",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "h-7 w-12 rounded-full p-0.5 transition-colors shrink-0",
        checked ? "bg-orange-gradient" : "bg-accent"
      )}
    >
      <span
        className={cn(
          "block h-6 w-6 rounded-full bg-white shadow-md transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
