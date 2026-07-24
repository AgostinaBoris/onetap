import { Pressable } from "./Pressable";
import type { TransactionRowData } from "@/lib/types";

export function TransactionRow({ t }: { t: TransactionRowData }) {
  return (
    <Pressable
      as="div"
      style={t.rowStyle}
      hoverStyle={{ background: "#101319", transform: "translateX(3px)" }}
    >
      <div style={t.iconWrap}>
        <i className={`ph ph-${t.icon}`} style={{ fontSize: 18 }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#F1F5F9",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {t.name}
        </div>
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 500,
            fontSize: 12.5,
            color: "#5B6578",
            marginTop: 2,
          }}
        >
          {t.sub}
        </div>
      </div>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: t.amountColor,
        }}
      >
        {t.amountText}
      </div>
    </Pressable>
  );
}
