import { cn } from "@/lib/utils";
import { Home, Briefcase, BedDouble, Users, MapPin, Clock, Sparkles } from "lucide-react";
import type { Address } from "./types";
import { formatExpiry } from "./store";

const iconMap = {
  home: Home,
  office: Briefcase,
  hotel: BedDouble,
  friend: Users,
  pin: MapPin,
};

export function AddressIcon({ icon, type }: { icon?: Address["icon"]; type: Address["type"] }) {
  const Icon = iconMap[icon ?? "pin"];
  return (
    <div
      className={cn(
        "h-11 w-11 rounded-2xl flex items-center justify-center shrink-0",
        type === "temporary"
          ? "bg-orange-gradient text-primary-foreground shadow-glow"
          : "bg-accent text-foreground"
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2.2} />
    </div>
  );
}

export function TempBadge({ expiresAt, compact }: { expiresAt?: number; compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
        <Sparkles className="h-3 w-3" /> Temporary
      </span>
      {!compact && expiresAt && (
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatExpiry(expiresAt)}
        </span>
      )}
    </div>
  );
}

export function AddressCard({
  address,
  onClick,
  selected,
  trailing,
}: {
  address: Address;
  onClick?: () => void;
  selected?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl p-4 border transition-all active:scale-[0.99]",
        "glass hover:border-primary/40",
        selected ? "border-primary shadow-glow" : "border-transparent"
      )}
    >
      <div className="flex gap-3">
        <AddressIcon icon={address.icon} type={address.type} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground text-[15px]">{address.label}</span>
            {address.type === "temporary" && <TempBadge expiresAt={address.expiresAt} compact />}
          </div>
          <p className="text-[13px] text-muted-foreground mt-0.5 line-clamp-2">
            {address.fullAddress}
          </p>
          {address.type === "temporary" && address.expiresAt && (
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary font-medium">
              <Clock className="h-3 w-3" />
              {formatExpiry(address.expiresAt)}
            </div>
          )}
        </div>
        {trailing}
      </div>
    </button>
  );
}
