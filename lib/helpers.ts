import type { CSSProperties } from "react";
import { CATEGORIES, COLORS } from "./data";
import type { Tile, Transaction, TransactionRowData } from "./types";

export function rgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function fmtDec(n: number): string {
  return (
    "$" +
    Number(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function iconWrap(color: string, size: number): CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: size * 0.45,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: rgba(color, 0.16),
    border: `1px solid ${rgba(color, 0.4)}`,
    color,
    transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
  };
}

export function toRow(t: Transaction, i = 0): TransactionRowData {
  const c = CATEGORIES[t.category] ?? CATEGORIES.otros;
  const inc = t.type === "ingreso";
  return {
    name: t.name,
    sub: c.label + " · " + t.date,
    icon: c.icon,
    iconWrap: iconWrap(c.color, 38),
    amountText: (inc ? "+" : "−") + fmt(t.amount),
    amountColor: inc ? COLORS.green : COLORS.red,
    rowStyle: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "13px 14px",
      borderRadius: 14,
      background: "#0C0E12",
      border: "1px solid rgba(241,245,249,.05)",
      transition: "background .2s,transform .18s",
      animation: "cardIn .5s ease backwards",
      animationDelay: (i || 0) * 0.05 + "s",
    },
  };
}

export function tile(
  key: string,
  c: { label: string; icon: string; color: string },
  selected: boolean,
  onPress: () => void,
  i = 0,
  clickable = true
): Tile {
  return {
    key,
    label: c.label,
    icon: c.icon,
    onPress: clickable ? onPress : () => {},
    tileStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      height: 92,
      borderRadius: 20,
      cursor: clickable ? "pointer" : "default",
      transition: "transform .3s cubic-bezier(.34,1.56,.64,1),border-color .2s,box-shadow .2s",
      animation: "cardIn .45s ease backwards",
      animationDelay: (i || 0) * 0.04 + "s",
      background:
        "radial-gradient(120% 130% at 50% 6%, #163a6e 0%, #0c1f3e 55%, #060e1f 100%)",
      border: selected ? `1.5px solid ${rgba(c.color, 0.9)}` : "1px solid rgba(90,170,255,.32)",
      boxShadow: selected
        ? `0 0 24px -4px ${rgba(c.color, 0.75)}, inset 0 0 18px ${rgba(c.color, 0.24)}`
        : "0 0 14px -8px rgba(51,144,253,.4)",
    },
    iconWrap: iconWrap(c.color, 32),
  };
}

export function filterButtonStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    height: 42,
    borderRadius: 14,
    cursor: "pointer",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    transition: "all .18s",
    border: active ? "1px solid " + rgba(COLORS.blue, 0.5) : "1px solid rgba(241,245,249,.08)",
    background: active ? rgba(COLORS.blue, 0.16) : "transparent",
    color: active ? COLORS.blue : COLORS.sub,
  };
}

export function swStyle(on: boolean): CSSProperties {
  return {
    width: 48,
    height: 28,
    borderRadius: 999,
    flexShrink: 0,
    cursor: "pointer",
    transition: "background .2s",
    position: "relative",
    border: "none",
    background: on ? COLORS.blue : "#2A3448",
  };
}

export function knStyle(on: boolean): CSSProperties {
  return {
    position: "absolute",
    top: 3,
    left: on ? 23 : 3,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#fff",
    transition: "left .2s",
  };
}
