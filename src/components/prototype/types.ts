export type AddressType = "permanent" | "temporary";
export type AddressStatus = "active" | "archived";

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  fullAddress: string;
  landmark?: string;
  type: AddressType;
  status: AddressStatus;
  expiresAt?: number; // ms timestamp
  createdAt: number;
  icon?: "home" | "office" | "hotel" | "friend" | "pin";
}

export type ScreenId =
  | "saved"
  | "add"
  | "smart"
  | "checkout"
  | "archived"
  | "notification"
  | "settings";
