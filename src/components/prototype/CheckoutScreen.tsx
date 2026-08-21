import { useState } from "react";
import { PhoneHeader, PrimaryButton } from "./ui";
import { AddressCard } from "./AddressCard";
import { Clock, Bike, Receipt, ChevronRight } from "lucide-react";
import type { Address, ScreenId } from "./types";

export function CheckoutScreen({
  addresses,
  go,
}: {
  addresses: Address[];
  go: (s: ScreenId) => void;
}) {
  const active = addresses.filter((a) => a.status === "active");
  const [selectedId, setSelectedId] = useState(active.find((a) => a.type === "temporary")?.id ?? active[0]?.id);

  return (
    <div className="flex flex-col h-full">
      <PhoneHeader title="Checkout" subtitle="Almost there" onBack={() => go("saved")} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-36 space-y-5">
        <section>
          <SectionHeader title="Deliver to" right="Change" />
          <div className="space-y-2.5">
            {active.map((a) => (
              <AddressCard
                key={a.id}
                address={a}
                onClick={() => setSelectedId(a.id)}
                selected={selectedId === a.id}
                trailing={
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedId === a.id ? "border-primary" : "border-border"
                    }`}
                  >
                    {selectedId === a.id && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </div>
                }
              />
            ))}
          </div>
        </section>

        <section className="glass rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[14px]">Order Summary</p>
            <span className="text-[11px] text-muted-foreground">3 items</span>
          </div>
          {[
            { name: "Butter Chicken", qty: 1, price: 380 },
            { name: "Garlic Naan", qty: 2, price: 120 },
            { name: "Gulab Jamun (2 pc)", qty: 1, price: 90 },
          ].map((i) => (
            <div key={i.name} className="flex justify-between text-[13px]">
              <span>
                <span className="text-muted-foreground mr-2">{i.qty}×</span>
                {i.name}
              </span>
              <span className="font-medium">₹{i.price}</span>
            </div>
          ))}
          <div className="h-px bg-border" />
          <div className="flex justify-between text-[13px] text-muted-foreground">
            <span>Delivery fee</span>
            <span>₹29</span>
          </div>
          <div className="flex justify-between font-semibold text-[15px]">
            <span>Total</span>
            <span>₹619</span>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-3 flex items-center gap-2">
            <Bike className="h-4 w-4 text-primary" />
            <div>
              <p className="text-[11px] text-muted-foreground">ETA</p>
              <p className="text-[13px] font-semibold">28–32 min</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-3 flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            <div>
              <p className="text-[11px] text-muted-foreground">Payment</p>
              <p className="text-[13px] font-semibold">UPI · ••2841</p>
            </div>
          </div>
        </section>

        <div className="glass rounded-2xl p-3 flex items-center gap-2 text-[12px] text-muted-foreground">
          <Clock className="h-4 w-4 text-primary shrink-0" />
          Temporary addresses behave like permanent ones during their active lifecycle —
          delivery is unaffected.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <PrimaryButton onClick={() => go("notification")}>
          Place Order · ₹619
        </PrimaryButton>
      </div>
    </div>
  );
}

function SectionHeader({ title, right }: { title: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-2 px-1">
      <h2 className="text-[13px] font-semibold uppercase tracking-wider">{title}</h2>
      {right && (
        <button className="text-[12px] text-primary font-medium flex items-center gap-0.5">
          {right} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
