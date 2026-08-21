import { useMemo, useState } from "react";
import { Plus, Archive, Settings2, Search, ChevronRight, Bell } from "lucide-react";
import type { Address, ScreenId } from "./types";
import { AddressCard } from "./AddressCard";
import { PhoneHeader, PrimaryButton } from "./ui";

export function SavedScreen({
  addresses,
  go,
}: {
  addresses: Address[];
  go: (s: ScreenId) => void;
}) {
  const [query, setQuery] = useState("");
  const active = useMemo(
    () =>
      addresses.filter(
        (a) =>
          a.status === "active" &&
          (a.label.toLowerCase().includes(query.toLowerCase()) ||
            a.fullAddress.toLowerCase().includes(query.toLowerCase()))
      ),
    [addresses, query]
  );
  const archivedCount = addresses.filter((a) => a.status === "archived").length;
  const permanent = active.filter((a) => a.type === "permanent");
  const temporary = active.filter((a) => a.type === "temporary");

  return (
    <div className="flex flex-col h-full">
      <PhoneHeader
        title="Saved Addresses"
        subtitle={`${active.length} active · ${archivedCount} archived`}
        right={
          <button
            onClick={() => go("notification")}
            className="h-9 w-9 rounded-full glass flex items-center justify-center relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          </button>
        }
      />

      <div className="px-5 pb-3">
        <div className="glass rounded-2xl flex items-center gap-2 px-4 h-11">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search addresses"
            className="bg-transparent flex-1 outline-none text-[14px] placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => go("add")}
            className="glass rounded-2xl p-3 text-left active:scale-[0.98] transition-transform"
          >
            <div className="h-9 w-9 rounded-xl bg-orange-gradient flex items-center justify-center shadow-glow">
              <Plus className="h-4 w-4 text-primary-foreground" />
            </div>
            <p className="mt-2 font-semibold text-[13px]">Add Address</p>
            <p className="text-[11px] text-muted-foreground">New delivery location</p>
          </button>
          <button
            onClick={() => go("archived")}
            className="glass rounded-2xl p-3 text-left active:scale-[0.98] transition-transform"
          >
            <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center">
              <Archive className="h-4 w-4" />
            </div>
            <p className="mt-2 font-semibold text-[13px]">Archived</p>
            <p className="text-[11px] text-muted-foreground">{archivedCount} past addresses</p>
          </button>
        </div>

        {permanent.length > 0 && (
          <Section title="Saved" caption="Always available at checkout">
            {permanent.map((a) => (
              <AddressCard key={a.id} address={a} onClick={() => go("checkout")} />
            ))}
          </Section>
        )}

        {temporary.length > 0 && (
          <Section
            title="Temporary stays"
            caption="Auto-archive after expiry"
            accent
          >
            {temporary.map((a) => (
              <AddressCard key={a.id} address={a} onClick={() => go("checkout")} />
            ))}
          </Section>
        )}

        <button
          onClick={() => go("settings")}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
        >
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
            <Settings2 className="h-4 w-4" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-[14px]">Travel Mode & Settings</p>
            <p className="text-[12px] text-muted-foreground">
              Configure how addresses are saved
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <PrimaryButton onClick={() => go("add")}>+ Add New Address</PrimaryButton>
      </div>
    </div>
  );
}

function Section({
  title,
  caption,
  accent,
  children,
}: {
  title: string;
  caption?: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 px-1">
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/90">
          {title}
        </h2>
        {caption && (
          <span className={accent ? "text-[11px] text-primary" : "text-[11px] text-muted-foreground"}>
            {caption}
          </span>
        )}
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
