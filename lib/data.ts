import type { Category, CategoryKey, Transaction } from "./types";

export const COLORS = {
  txt: "#F1F5F9",
  sub: "#94A3B8",
  mut: "#5B6578",
  blue: "#3390FD",
  green: "#19E680",
  red: "#F87171",
} as const;

export const BASE_BALANCE = 6240;

export const MONTHS = [
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
];

export const CATEGORIES: Record<CategoryKey, Category> = {
  comida: { label: "Food", icon: "fork-knife", color: "#FF7A9C" },
  transporte: { label: "Transport", icon: "car", color: "#3390FD" },
  compras: { label: "Shopping", icon: "shopping-bag", color: "#C06BFF" },
  viajes: { label: "Travel", icon: "airplane-tilt", color: "#2FD3C0" },
  ocio: { label: "Leisure", icon: "popcorn", color: "#8A7CFF" },
  servicios: { label: "Services", icon: "wrench", color: "#4CC9F0" },
  salud: { label: "Health", icon: "heartbeat", color: "#F87171" },
  educacion: { label: "Education", icon: "graduation-cap", color: "#6C8BFF" },
  otros: { label: "Other", icon: "dots-three-outline", color: "#94A3B8" },
  salario: { label: "Salary", icon: "money", color: "#19E680" },
  freelance: { label: "Freelance", icon: "laptop", color: "#4CC9F0" },
  transferencia: { label: "Transfer", icon: "bank", color: "#7CE0A0" },
};

export const EXPENSE_CATEGORY_KEYS: CategoryKey[] = [
  "comida",
  "transporte",
  "compras",
  "viajes",
  "ocio",
  "servicios",
  "salud",
  "educacion",
  "otros",
];

export const INCOME_CATEGORY_KEYS: CategoryKey[] = [
  "salario",
  "freelance",
  "transferencia",
  "otros",
];

export const CATEGORIES_SCREEN_EXPENSE_KEYS: CategoryKey[] = [
  "ocio",
  "viajes",
  "transporte",
  "compras",
  "servicios",
  "salud",
  "educacion",
  "comida",
  "otros",
];

export const CATEGORIES_SCREEN_INCOME_KEYS: CategoryKey[] = [
  "freelance",
  "transferencia",
  "salario",
  "otros",
];

export const HOME_CHIP_KEYS: CategoryKey[] = [
  "comida",
  "transporte",
  "compras",
  "viajes",
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, name: "Supermarket", type: "gasto", amount: 2100, category: "comida", date: "Today 15:20" },
  { id: 2, name: "Shell Gas", type: "gasto", amount: 1500, category: "transporte", date: "Today 09:15" },
  { id: 3, name: "Salary", type: "ingreso", amount: 9000, category: "salario", date: "Yesterday" },
  { id: 4, name: "Uber", type: "gasto", amount: 850, category: "transporte", date: "24 Mar" },
  { id: 5, name: "Zara", type: "gasto", amount: 1830, category: "compras", date: "22 Mar" },
  { id: 6, name: "Cinemark", type: "gasto", amount: 350, category: "ocio", date: "22 Mar" },
  { id: 7, name: "Netflix", type: "gasto", amount: 490, category: "ocio", date: "20 Mar" },
  { id: 8, name: "Freelance", type: "ingreso", amount: 2500, category: "freelance", date: "18 Mar" },
  { id: 9, name: "McDonald's", type: "gasto", amount: 620, category: "comida", date: "18 Mar" },
  { id: 10, name: "Spotify", type: "gasto", amount: 500, category: "ocio", date: "12 Mar" },
  { id: 11, name: "Transfer", type: "ingreso", amount: 1000, category: "transferencia", date: "8 Mar" },
];
