import type { CSSProperties } from "react";
import { Pressable } from "./Pressable";

const BASE: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 14,
  border: "1px solid rgba(241,245,249,.1)",
  background: "#0C0E12",
  color: "#F1F5F9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
  transition: "filter .2s,transform .15s",
};

export function BackButton({
  onClick,
  style,
}: {
  onClick: () => void;
  style?: CSSProperties;
}) {
  return (
    <Pressable
      onClick={onClick}
      style={{ ...BASE, ...style }}
      hoverStyle={{ filter: "brightness(1.4)" }}
      activeStyle={{ transform: "scale(.95)" }}
    >
      <i className="ph-bold ph-caret-left" style={{ fontSize: 20 }} />
    </Pressable>
  );
}
