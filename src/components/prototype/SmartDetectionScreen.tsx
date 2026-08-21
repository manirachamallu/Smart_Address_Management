import { PhoneHeader, PrimaryButton, GhostButton } from "./ui";
import { Sparkles, MapPin, Brain, ShieldCheck } from "lucide-react";
import type { ScreenId } from "./types";

export function SmartDetectionScreen({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col h-full">
      <PhoneHeader title="Smart Address Detection" onBack={() => go("add")} />
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 space-y-4">
        <div className="glass rounded-2xl p-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
            You typed
          </p>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <p className="text-[15px] font-semibold">Hotel Taj Bangalore</p>
          </div>
        </div>

        <div className="rounded-3xl p-5 border border-primary/30 bg-primary/8 relative overflow-hidden animate-slide-up">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-gradient opacity-25 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-gradient text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-glow">
              <Sparkles className="h-3 w-3" /> AI Suggestion
            </div>
            <p className="text-[18px] font-semibold mt-3 leading-snug">
              Looks like a temporary stay.
              <br />
              <span className="text-muted-foreground font-medium">
                Want us to auto-expire this address later?
              </span>
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              <Stat icon={<Brain className="h-3 w-3" />} label="Recognized" value="Hotel keyword" />
              <Stat icon={<ShieldCheck className="h-3 w-3" />} label="Suggested expiry" value="3 days" />
            </div>

            <div className="mt-5 space-y-2">
              <PrimaryButton onClick={() => go("saved")}>Enable Temporary Mode</PrimaryButton>
              <GhostButton onClick={() => go("saved")}>Keep Permanent</GhostButton>
            </div>
          </div>
        </div>

        <div className="text-[12px] text-muted-foreground px-2 leading-relaxed">
          We detect keywords like <span className="text-foreground">hotel, hostel, Airbnb, resort, villa</span> and
          intelligently propose a lifecycle for your address. You stay in control — always.
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-[13px] font-semibold mt-0.5">{value}</p>
    </div>
  );
}
