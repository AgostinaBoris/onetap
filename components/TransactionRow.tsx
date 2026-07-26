import { Pressable } from "./Pressable";
import type { TransactionRowData } from "@/lib/types";

export function TransactionRow({ t, onDelete }: { t: TransactionRowData; onDelete?: () => void }) {
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
      {onDelete && (
        <Pressable
          as="div"
          onClick={onDelete}
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 2,
            color: "#5B6578",
            background: "transparent",
            cursor: "pointer",
            transition: "background .15s,color .15s",
          }}
          hoverStyle={{ background: "rgba(248,113,113,.16)", color: "#F87171" }}
          activeStyle={{ transform: "scale(.88)" }}
        >
          <i className="ph-bold ph-x" style={{ fontSize: 13 }} />
        </Pressable>
      )}
    </Pressable>
  );
}
