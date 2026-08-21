import { PhoneHeader, Toggle } from "./ui";
import { Plane, Bell, Sparkles, Archive } from "lucide-react";
import type { ScreenId } from "./types";

export function SettingsScreen({
  go,
  travelMode,
  setTravelMode,
  smartSuggest,
  setSmartSuggest,
  expiryAlerts,
  setExpiryAlerts,
}: {
  go: (s: ScreenId) => void;
  travelMode: boolean;
  setTravelMode: (v: boolean) => void;
  smartSuggest: boolean;
  setSmartSuggest: (v: boolean) => void;
  expiryAlerts: boolean;
  setExpiryAlerts: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <PhoneHeader title="Address Settings" onBack={() => go("saved")} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10 space-y-4">
        <div className="rounded-3xl p-5 border border-primary/30 bg-primary/8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-gradient opacity-25 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-gradient text-primary-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-glow">
                  <Plane className="h-3 w-3" /> Travel Mode
                </div>
                <p className="mt-3 text-[16px] font-semibold leading-snug">
                  Treat new addresses as temporary
                </p>
                <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                  When enabled, newly added addresses default to a 3-day expiry. Perfect
                  for trips, hotel stays, or staying at someone else's place.
                </p>
              </div>
              <Toggle checked={travelMode} onChange={setTravelMode} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              <Mini label="Default expiry" value="3 days" />
              <Mini label="Auto-archive" value="On expiry" />
            </div>
          </div>
        </div>

        <SettingRow
          icon={<Sparkles className="h-4 w-4 text-primary" />}
          title="Smart Suggestions"
          desc="Detect hotels, hostels & Airbnbs while typing"
          checked={smartSuggest}
          onChange={setSmartSuggest}
        />
        <SettingRow
          icon={<Bell className="h-4 w-4 text-primary" />}
          title="Expiry Alerts"
          desc="Notify 12 hours before a temporary address expires"
          checked={expiryAlerts}
          onChange={setExpiryAlerts}
        />

        <button
          onClick={() => go("archived")}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
            <Archive className="h-4 w-4" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-[14px]">Manage archived addresses</p>
            <p className="text-[12px] text-muted-foreground">
              Restore, convert, or delete past locations
            </p>
          </div>
        </button>

        <p className="text-[11px] text-muted-foreground text-center px-6 leading-relaxed">
          Lifecycle-based address management keeps your checkout clean without ever losing
          a place you've been to.
        </p>
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  desc,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[14px]">{title}</p>
        <p className="text-[12px] text-muted-foreground">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-[12px] font-semibold mt-0.5">{value}</p>
    </div>
  );
}
