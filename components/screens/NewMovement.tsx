import type { CSSProperties } from "react";
import { BackButton } from "../BackButton";
import { Pressable } from "../Pressable";
import type { NumpadKey, Tile } from "@/lib/types";

export function NewMovement({
  onBack,
  title,
  amountText,
  amountColor,
  subtitle,
  gridCats,
  keys,
  onConfirm,
  confirmStyle,
  canConfirm,
}: {
  onBack: () => void;
  title: string;
  amountText: string;
  amountColor: string;
  subtitle: string;
  gridCats: Tile[];
  keys: NumpadKey[];
  onConfirm: () => void;
  confirmStyle: CSSProperties;
  canConfirm: boolean;
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 34px", display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <BackButton onClick={onBack} />
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 22, color: "#F1F5F9", letterSpacing: "-.02em" }}>
            {title}
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "24px 0 8px" }}>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: ".09em", color: "#94A3B8" }}>
            AMOUNT
          </div>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 38, color: amountColor, letterSpacing: "-.03em", marginTop: 4 }}>
            {amountText}
          </div>
        </div>
        <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".09em", color: "#5B6578", margin: "20px 2px 12px" }}>
          {subtitle}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {gridCats.map((c) => (
            <Pressable
              key={c.key}
              as="div"
              onClick={c.onPress}
              style={c.tileStyle}
              hoverStyle={{ transform: "translateY(-4px) scale(1.04)", border: "1.5px solid rgba(140,200,255,.7)" }}
              activeStyle={{ transform: "scale(.92)" }}
            >
              <div style={c.iconWrap}>
                <i className={`ph ph-${c.icon}`} style={{ fontSize: 17 }} />
              </div>
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 11.5, color: "#CBD5E1" }}>
                {c.label}
              </span>
            </Pressable>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {keys.map((k, i) => (
            <Pressable
              key={i}
              onClick={k.onPress}
              style={{
                height: 50,
                borderRadius: 15,
                border: "1px solid rgba(241,245,249,.06)",
                background: "#0C0E12",
                color: "#F1F5F9",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform .1s,background .15s",
              }}
              hoverStyle={{ background: "#141821" }}
              activeStyle={{ transform: "scale(.94)" }}
            >
              {k.isDel ? <i className="ph-bold ph-backspace" style={{ fontSize: 22 }} /> : k.label}
            </Pressable>
          ))}
        </div>
        <Pressable
          onClick={onConfirm}
          style={confirmStyle}
          hoverStyle={canConfirm ? { filter: "brightness(1.1)" } : undefined}
          activeStyle={canConfirm ? { transform: "scale(.985)" } : undefined}
        >
          Confirm
        </Pressable>
      </div>
    </div>
  );
}
