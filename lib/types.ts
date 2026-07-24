import type { CSSProperties } from "react";

export type Screen =
  | "onboarding"
  | "login"
  | "signup"
  | "signupSuccess"
  | "home"
  | "balance"
  | "movimientos"
  | "categorias"
  | "nuevo"
  | "perfil"
  | "settings"
  | "help"
  | "success";

export type Tab = "home" | "balance" | "movimientos" | "perfil";

export type TransactionType = "gasto" | "ingreso";

export type CategoryKey =
  | "comida"
  | "transporte"
  | "compras"
  | "viajes"
  | "ocio"
  | "servicios"
  | "salud"
  | "educacion"
  | "otros"
  | "salario"
  | "freelance"
  | "transferencia";

export interface Category {
  label: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: number;
  name: string;
  type: TransactionType;
  amount: number;
  category: CategoryKey;
  date: string;
}

export interface TransactionRowData {
  name: string;
  sub: string;
  icon: string;
  iconWrap: CSSProperties;
  amountText: string;
  amountColor: string;
  rowStyle: CSSProperties;
}

export interface Tile {
  key: string;
  label: string;
  icon: string;
  onPress: () => void;
  tileStyle: CSSProperties;
  iconWrap: CSSProperties;
}

export interface NavItem {
  label: string;
  icon: string;
  weight: "fill" | "duotone";
  fw: number;
  color: string;
  onPress: () => void;
}

export interface FilterDef {
  label: string;
  onPress: () => void;
  style: CSSProperties;
}

export interface NumpadKey {
  label: string;
  icon: string | null;
  isDel: boolean;
  onPress: () => void;
}
