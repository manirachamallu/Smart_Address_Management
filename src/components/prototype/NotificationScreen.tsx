import { PhoneHeader } from "./ui";
import { Bell, BedDouble, Clock, Plus, Lock, Archive } from "lucide-react";
import type { ScreenId } from "./types";

export function NotificationScreen({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col h-full">
      <PhoneHeader title="Notifications" onBack={() => go("saved")} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10 space-y-4">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground px-1">
          Lock screen preview
        </p>

        <div className="rounded-3xl p-4 glass shadow-elegant animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-orange-gradient flex items-center justify-center shadow-glow shrink-0">
              <BedDouble className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold">FOODIE · ADDRESS EXPIRING</p>
                <span className="text-[11px] text-muted-foreground">now</span>
              </div>
              <p className="text-[14px] font-semibold mt-1 leading-snug">
                Your temporary address "Hotel Taj Bangalore" expires in 12 hours.
              </p>
              <p className="text-[12px] text-muted-foreground mt-1">
                Tap an action to keep it active, archive it, or convert it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <NotifAction
              icon={<Plus className="h-3.5 w-3.5" />}
              label="Extend Stay"
              onClick={() => go("saved")}
              primary
            />
            <NotifAction
              icon={<Lock className="h-3.5 w-3.5" />}
              label="Make Permanent"
              onClick={() => go("saved")}
            />
            <NotifAction
              icon={<Archive className="h-3.5 w-3.5" />}
              label="Archive Now"
              onClick={() => go("archived")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <NotifRow
            icon={<Clock className="h-4 w-4 text-primary" />}
            title="Friend's House expires in 2 days"
            body="We'll auto-archive it on 27 May. Restore anytime."
            time="2h"
          />
          <NotifRow
            icon={<Bell className="h-4 w-4 text-primary" />}
            title="Order delivered to Hotel Taj Bangalore"
            body="Hope you enjoyed it! Rate your delivery."
            time="Yesterday"
          />
        </div>
      </div>
    </div>
  );
}

function NotifAction({
  icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-10 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 ${
        primary
          ? "bg-orange-gradient text-primary-foreground shadow-glow"
          : "bg-accent text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function NotifRow({
  icon,
  title,
  body,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  time: string;
}) {
  return (
    <div className="glass rounded-2xl p-3 flex gap-3">
      <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold truncate">{title}</p>
          <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{time}</span>
        </div>
        <p className="text-[12px] text-muted-foreground mt-0.5">{body}</p>
      </div>
    </div>
  );
}
