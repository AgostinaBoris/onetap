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

export const INITIAL_TRANSACTIONS: Transaction[] = [];

export const ICON_CHOICES: string[] = [
  "fork-knife",
  "car",
  "shopping-bag",
  "airplane-tilt",
  "popcorn",
  "wrench",
  "heartbeat",
  "graduation-cap",
  "money",
  "laptop",
  "bank",
  "house",
  "gift",
  "coffee",
  "game-controller",
  "paw-print",
  "book-open",
  "phone",
  "gas-pump",
  "tree",
  "baby",
  "pill",
  "wallet",
  "piggy-bank",
  "credit-card",
  "music-notes",
  "umbrella",
  "star",
  "heart",
  "dots-three-outline",
];

export const CATEGORY_COLOR_CHOICES: string[] = [
  "#FF7A9C",
  "#3390FD",
  "#C06BFF",
  "#2FD3C0",
  "#8A7CFF",
  "#4CC9F0",
  "#F87171",
  "#6C8BFF",
  "#19E680",
  "#F5A623",
];
