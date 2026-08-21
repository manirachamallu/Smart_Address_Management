import { PhoneHeader } from "./ui";
import { AddressIcon } from "./AddressCard";
import { RotateCcw, Trash2, Lock, Archive } from "lucide-react";
import type { Address, ScreenId } from "./types";
import { formatArchivedDate } from "./store";

export function ArchivedScreen({
  addresses,
  go,
  onRestore,
  onDelete,
  onConvert,
}: {
  addresses: Address[];
  go: (s: ScreenId) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onConvert: (id: string) => void;
}) {
  const archived = addresses.filter((a) => a.status === "archived");

  return (
    <div className="flex flex-col h-full">
      <PhoneHeader
        title="Archived Addresses"
        subtitle={`${archived.length} expired addresses`}
        onBack={() => go("saved")}
      />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10 space-y-3">
        <div className="glass rounded-2xl p-4 flex gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <Archive className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13px] font-semibold">Nothing is ever deleted automatically.</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Expired addresses stay here for 30 days so you can restore or convert them anytime.
            </p>
          </div>
        </div>

        {archived.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-[13px]">
            No archived addresses yet.
          </div>
        )}

        {archived.map((a) => (
          <div key={a.id} className="rounded-2xl p-4 bg-card/50 border border-border opacity-90">
            <div className="flex gap-3">
              <div className="opacity-70">
                <AddressIcon icon={a.icon} type="permanent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[14px] text-muted-foreground">
                    {a.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
                    Expired
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground/80 mt-0.5 line-clamp-2">
                  {a.fullAddress}
                </p>
                <p className="text-[11px] text-muted-foreground/70 mt-1">
                  Expired on {formatArchivedDate(a.expiresAt)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3">
              <ActionBtn
                onClick={() => onRestore(a.id)}
                icon={<RotateCcw className="h-3.5 w-3.5" />}
                label="Restore"
              />
              <ActionBtn
                onClick={() => onConvert(a.id)}
                icon={<Lock className="h-3.5 w-3.5" />}
                label="Make Permanent"
                primary
              />
              <ActionBtn
                onClick={() => onDelete(a.id)}
                icon={<Trash2 className="h-3.5 w-3.5" />}
                label="Delete"
                danger
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
  primary,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-10 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] ${
        primary
          ? "bg-orange-gradient text-primary-foreground shadow-glow"
          : danger
          ? "glass text-destructive"
          : "glass text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
