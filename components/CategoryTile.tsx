import { Pressable } from "./Pressable";
import type { Tile } from "@/lib/types";

export function CategoryTile({
  c,
  hoverBorder = "1px solid rgba(51,144,253,.45)",
}: {
  c: Tile;
  hoverBorder?: string;
}) {
  return (
    <Pressable
      as="div"
      onClick={c.onPress}
      style={c.tileStyle}
      hoverStyle={{ transform: "translateY(-4px) scale(1.04)", border: hoverBorder }}
      activeStyle={{ transform: "scale(.93)" }}
    >
      <div style={c.iconWrap}>
        <i className={`ph ph-${c.icon}`} style={{ fontSize: 17 }} />
      </div>
      <span
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontWeight: 600,
          fontSize: 12,
          color: "#94A3B8",
        }}
      >
        {c.label}
      </span>
    </Pressable>
  );
}
