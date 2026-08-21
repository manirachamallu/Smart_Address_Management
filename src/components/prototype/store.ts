import { useEffect, useState } from "react";
import type { Address } from "./types";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const now = Date.now();

export const initialAddresses: Address[] = [
  {
    id: "a1",
    label: "Home",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    fullAddress: "B-204, Lotus Residency, Indiranagar, Bengaluru 560038",
    landmark: "Near Sony World Signal",
    type: "permanent",
    status: "active",
    createdAt: now - 30 * DAY,
    icon: "home",
  },
  {
    id: "a2",
    label: "Office",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    fullAddress: "Prestige Tech Park, Tower D, Marathahalli, Bengaluru 560103",
    landmark: "Opposite Soul Space Spirit",
    type: "permanent",
    status: "active",
    createdAt: now - 60 * DAY,
    icon: "office",
  },
  {
    id: "a3",
    label: "Hotel Stay",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    fullAddress: "Hotel Taj Bangalore, Room 1204, MG Road, Bengaluru 560001",
    landmark: "Near Trinity Metro",
    type: "temporary",
    status: "active",
    expiresAt: now + 12 * HOUR,
    createdAt: now - 2 * DAY,
    icon: "hotel",
  },
  {
    id: "a4",
    label: "Friend's House",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    fullAddress: "42, Koramangala 5th Block, Bengaluru 560095",
    landmark: "Above Third Wave Coffee",
    type: "temporary",
    status: "active",
    expiresAt: now + 2 * DAY,
    createdAt: now - 1 * DAY,
    icon: "friend",
  },
  {
    id: "a5",
    label: "Goa Airbnb",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    fullAddress: "Villa 7, Anjuna Beach Road, North Goa 403509",
    type: "temporary",
    status: "archived",
    expiresAt: now - 5 * DAY,
    createdAt: now - 20 * DAY,
    icon: "pin",
  },
  {
    id: "a6",
    label: "Mumbai Hostel",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    fullAddress: "Zostel Mumbai, Andheri West, Mumbai 400058",
    type: "temporary",
    status: "archived",
    expiresAt: now - 12 * DAY,
    createdAt: now - 40 * DAY,
    icon: "pin",
  },
];

export function formatExpiry(expiresAt?: number) {
  if (!expiresAt) return "";
  const diff = expiresAt - Date.now();
  if (diff <= 0) return "Expired";
  const hrs = Math.floor(diff / HOUR);
  if (hrs < 24) return `Expires in ${hrs} hr${hrs === 1 ? "" : "s"}`;
  const days = Math.floor(hrs / 24);
  return `Expires in ${days} day${days === 1 ? "" : "s"}`;
}

export function formatArchivedDate(ts?: number) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function useNow(intervalMs = 60_000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(i);
  }, [intervalMs]);
}
