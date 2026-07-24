import { Pressable } from "./Pressable";
import type { NavItem } from "@/lib/types";

export function TabBar({ items }: { items: NavItem[] }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 92,
        zIndex: 30,
        background: "linear-gradient(0deg,#040507 74%,rgba(4,5,7,0))",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(241,245,249,.06)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        padding: "14px 14px 0",
      }}
    >
      {items.map((n) => (
        <Pressable
          key={n.label}
          onClick={n.onPress}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            padding: "6px 12px",
            transition: "transform .18s",
          }}
          hoverStyle={{ transform: "translateY(-3px)" }}
          activeStyle={{ transform: "scale(.9)" }}
        >
          <i className={`ph ph-${n.icon}`} style={{ fontSize: 25, color: n.color }} />
          <span
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: n.fw,
              fontSize: 11,
              color: n.color,
            }}
          >
            {n.label}
          </span>
        </Pressable>
      ))}
    </div>
  );
}
