import { useEffect, useState } from "react";
import { PhoneHeader, PrimaryButton, Toggle } from "./ui";
import { Sparkles, MapPin, Hotel } from "lucide-react";
import type { Address, ScreenId } from "./types";
import { cn } from "@/lib/utils";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const DURATIONS = [
  { id: "24h", label: "24 Hours", ms: 24 * HOUR },
  { id: "3d", label: "3 Days", ms: 3 * DAY },
  { id: "1w", label: "1 Week", ms: 7 * DAY },
  { id: "custom", label: "Custom", ms: 5 * DAY },
];

const TRIGGERS = ["hotel", "airbnb", "hostel", "resort", "stay", "inn", "villa", "taj", "oyo", "marriott"];

export function AddAddressScreen({
  go,
  onSave,
  travelMode,
}: {
  go: (s: ScreenId) => void;
  onSave: (a: Address) => void;
  travelMode: boolean;
}) {
  const [fullAddress, setFullAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("Aarav Sharma");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [label, setLabel] = useState("");
  const [type, setType] = useState<"permanent" | "temporary">(travelMode ? "temporary" : "permanent");
  const [duration, setDuration] = useState("3d");
  const [showSmart, setShowSmart] = useState(false);

  useEffect(() => {
    const lower = fullAddress.toLowerCase();
    const matched = TRIGGERS.some((t) => lower.includes(t));
    setShowSmart(matched && type === "permanent");
  }, [fullAddress, type]);

  const canSave = fullAddress.trim().length > 5 && label.trim().length > 0;

  const handleSave = () => {
    const dur = DURATIONS.find((d) => d.id === duration) ?? DURATIONS[1];
    const addr: Address = {
      id: `n${Date.now()}`,
      label: label || "New Address",
      name,
      phone,
      fullAddress,
      landmark,
      type,
      status: "active",
      expiresAt: type === "temporary" ? Date.now() + dur.ms : undefined,
      createdAt: Date.now(),
      icon: type === "temporary" ? "hotel" : "pin",
    };
    onSave(addr);
    go("saved");
  };

  return (
    <div className="flex flex-col h-full">
      <PhoneHeader title="Add New Address" onBack={() => go("saved")} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-4">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium">Delivering to</p>
            <p className="text-[11px] text-muted-foreground">Detected via GPS · Bengaluru</p>
          </div>
        </div>

        <Field label="Full Address">
          <textarea
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="Try typing 'Hotel Taj Bangalore'"
            rows={2}
            className="w-full bg-transparent outline-none text-[14px] resize-none placeholder:text-muted-foreground"
          />
        </Field>

        {showSmart && (
          <SmartSuggestion
            onEnable={() => {
              setType("temporary");
              setShowSmart(false);
            }}
            onKeep={() => setShowSmart(false)}
            onSeeDemo={() => go("smart")}
          />
        )}

        <Field label="Landmark (optional)">
          <input
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Near MG Road metro"
            className="w-full bg-transparent outline-none text-[14px] placeholder:text-muted-foreground"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </Field>
          <Field label="Phone">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </Field>
        </div>

        <Field label="Address Label">
          <div className="flex items-center gap-2 flex-wrap">
            {["Home", "Office", "Hotel", "Friend"].map((l) => (
              <button
                key={l}
                onClick={() => setLabel(l)}
                className={cn(
                  "px-3 h-8 rounded-full text-[12px] font-medium border transition-colors",
                  label === l
                    ? "bg-orange-gradient text-primary-foreground border-transparent"
                    : "border-border text-muted-foreground"
                )}
              >
                {l}
              </button>
            ))}
            <input
              value={label && !["Home", "Office", "Hotel", "Friend"].includes(label) ? label : ""}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Custom…"
              className="flex-1 min-w-[80px] bg-transparent outline-none text-[14px] placeholder:text-muted-foreground"
            />
          </div>
        </Field>

        <div className="glass rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wider">Address Type</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Choose how long this address should live
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <TypeOption
              active={type === "permanent"}
              onClick={() => setType("permanent")}
              title="Permanent"
              desc="Always saved"
            />
            <TypeOption
              active={type === "temporary"}
              onClick={() => setType("temporary")}
              title="Temporary Stay"
              desc="Auto-expires"
              accent
            />
          </div>

          {type === "temporary" && (
            <div className="pt-2 animate-slide-up">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-primary mb-2">
                Expiry Duration
              </p>
              <div className="grid grid-cols-4 gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={cn(
                      "h-11 rounded-xl text-[12px] font-semibold border transition-all",
                      duration === d.id
                        ? "bg-orange-gradient text-primary-foreground border-transparent shadow-glow"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                <Hotel className="h-3 w-3" />
                After expiry, this address moves to Archived — never lost.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <PrimaryButton disabled={!canSave} onClick={handleSave}>
          Save Address
        </PrimaryButton>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
        {label}
      </p>
      {children}
    </div>
  );
}

function TypeOption({
  active,
  onClick,
  title,
  desc,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl p-3 text-left border transition-all",
        active
          ? accent
            ? "bg-orange-gradient text-primary-foreground border-transparent shadow-glow"
            : "bg-accent border-border"
          : "border-border bg-transparent"
      )}
    >
      <p className="font-semibold text-[13px]">{title}</p>
      <p
        className={cn(
          "text-[11px] mt-0.5",
          active && accent ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        {desc}
      </p>
    </button>
  );
}

function SmartSuggestion({
  onEnable,
  onKeep,
  onSeeDemo,
}: {
  onEnable: () => void;
  onKeep: () => void;
  onSeeDemo: () => void;
}) {
  return (
    <div className="rounded-2xl p-4 border border-primary/40 bg-primary/8 animate-slide-up relative overflow-hidden">
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-orange-gradient opacity-20 blur-2xl" />
      <div className="flex gap-3 relative">
        <div className="h-9 w-9 rounded-xl bg-orange-gradient flex items-center justify-center shadow-glow shrink-0">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Smart Suggestion
          </p>
          <p className="text-[14px] font-medium mt-0.5 leading-snug">
            Looks like a temporary stay. Auto-expire this address later?
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={onEnable}
              className="h-9 px-3 rounded-xl bg-orange-gradient text-primary-foreground text-[12px] font-semibold"
            >
              Enable Temporary
            </button>
            <button
              onClick={onKeep}
              className="h-9 px-3 rounded-xl glass text-[12px] font-semibold"
            >
              Keep Permanent
            </button>
            <button
              onClick={onSeeDemo}
              className="h-9 px-2 text-[12px] text-muted-foreground"
            >
              How?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
