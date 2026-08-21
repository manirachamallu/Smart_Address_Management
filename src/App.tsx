import { useMemo, useState } from "react";
import {
  Bookmark,
  PlusCircle,
  Sparkles,
  ShoppingBag,
  Archive,
  Bell,
  Settings2,
} from "lucide-react";
import type { Address, ScreenId } from "@/components/prototype/types";
import { initialAddresses } from "@/components/prototype/store";
import { SavedScreen } from "@/components/prototype/SavedScreen";
import { AddAddressScreen } from "@/components/prototype/AddAddressScreen";
import { SmartDetectionScreen } from "@/components/prototype/SmartDetectionScreen";
import { CheckoutScreen } from "@/components/prototype/CheckoutScreen";
import { ArchivedScreen } from "@/components/prototype/ArchivedScreen";
import { NotificationScreen } from "@/components/prototype/NotificationScreen";
import { SettingsScreen } from "@/components/prototype/SettingsScreen";
import { StatusBar } from "@/components/prototype/ui";

const NAV: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "add", label: "Add", icon: PlusCircle },
  { id: "smart", label: "Smart AI", icon: Sparkles },
  { id: "checkout", label: "Checkout", icon: ShoppingBag },
  { id: "archived", label: "Archived", icon: Archive },
  { id: "notification", label: "Notify", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings2 },
];

export default function App() {
  const [screen, setScreen] = useState<ScreenId>("saved");
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [travelMode, setTravelMode] = useState(false);
  const [smartSuggest, setSmartSuggest] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);

  const go = (s: ScreenId) => setScreen(s);

  const onSave = (a: Address) => setAddresses((prev) => [a, ...prev]);
  const onRestore = (id: string) =>
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "active", expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000 }
          : a
      )
    );
  const onDelete = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));
  const onConvert = (id: string) =>
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "active", type: "permanent", expiresAt: undefined } : a
      )
    );

  const screenEl = useMemo(() => {
    switch (screen) {
      case "saved":
        return <SavedScreen addresses={addresses} go={go} />;
      case "add":
        return <AddAddressScreen go={go} onSave={onSave} travelMode={travelMode} />;
      case "smart":
        return <SmartDetectionScreen go={go} />;
      case "checkout":
        return <CheckoutScreen addresses={addresses} go={go} />;
      case "archived":
        return (
          <ArchivedScreen
            addresses={addresses}
            go={go}
            onRestore={onRestore}
            onDelete={onDelete}
            onConvert={onConvert}
          />
        );
      case "notification":
        return <NotificationScreen go={go} />;
      case "settings":
        return (
          <SettingsScreen
            go={go}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            smartSuggest={smartSuggest}
            setSmartSuggest={setSmartSuggest}
            expiryAlerts={expiryAlerts}
            setExpiryAlerts={setExpiryAlerts}
          />
        );
    }
  }, [screen, addresses, travelMode, smartSuggest, expiryAlerts]);

  return (
    <main className="min-h-screen w-full bg-surface-gradient text-foreground flex flex-col lg:flex-row items-start justify-center gap-10 p-6 lg:p-12">
      {/* Sidebar / case study panel */}
      <aside className="w-full lg:w-[360px] lg:sticky lg:top-12 space-y-6 max-w-md">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-gradient text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-glow">
            <Sparkles className="h-3 w-3" /> Product Concept
          </div>
          <h1 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            Temporary Address
            <br />
            <span className="bg-orange-gradient bg-clip-text text-transparent">
              Lifecycle Management
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            A premium food-delivery feature that solves saved-address clutter for frequent
            travelers. Mark addresses as temporary, auto-archive on expiry, and recover
            anything — never lose a place you've been to.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { k: "−68%", v: "Wrong-address orders" },
            { k: "3.2×", v: "Faster checkout" },
            { k: "0", v: "Hard deletes" },
            { k: "12h", v: "Pre-expiry alert" },
          ].map((m) => (
            <div key={m.v} className="glass rounded-2xl p-3">
              <p className="text-xl font-bold bg-orange-gradient bg-clip-text text-transparent">
                {m.k}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{m.v}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-1">
            Explore flow
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {NAV.map((n) => {
              const Icon = n.icon;
              const active = screen === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`flex items-center gap-2 px-3 h-10 rounded-xl text-[12px] font-medium transition-all ${
                    active
                      ? "bg-orange-gradient text-primary-foreground shadow-glow"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          React + TypeScript + Tailwind · Production-ready components
        </p>
      </aside>

      {/* Phone frame */}
      <div className="relative shrink-0">
        <div className="absolute -inset-6 bg-orange-gradient opacity-20 blur-3xl rounded-full pointer-events-none" />
        <div className="relative w-[390px] h-[844px] rounded-[3rem] border border-border bg-background overflow-hidden shadow-elegant">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-32 rounded-full bg-black z-30" />
          <div className="h-full flex flex-col">
            <StatusBar />
            <div className="flex-1 relative overflow-hidden">
              <div key={screen} className="absolute inset-0 animate-fade-in">
                {screenEl}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
