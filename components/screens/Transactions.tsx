import { BackButton } from "../BackButton";
import { TransactionRow } from "../TransactionRow";
import type { FilterDef, TransactionRowData } from "@/lib/types";

export function Transactions({
  onBack,
  filtAll,
  filtIncome,
  filtExpenses,
  movList,
}: {
  onBack: () => void;
  filtAll: FilterDef;
  filtIncome: FilterDef;
  filtExpenses: FilterDef;
  movList: TransactionRowData[];
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 118px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <BackButton onClick={onBack} />
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 26, color: "#F1F5F9", letterSpacing: "-.02em" }}>
            Transactions
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 52,
            padding: "0 16px",
            borderRadius: 16,
            background: "#0C0E12",
            border: "1px solid rgba(241,245,249,.07)",
            marginTop: 16,
            animation: "cardIn .5s ease .05s backwards",
          }}
        >
          <i className="ph ph-magnifying-glass" style={{ fontSize: 19, color: "#5B6578" }} />
          <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "#5B6578" }}>
            Search transactions
          </span>
        </div>
        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
          <button onClick={filtAll.onPress} style={filtAll.style}>
            {filtAll.label}
          </button>
          <button onClick={filtIncome.onPress} style={filtIncome.style}>
            {filtIncome.label}
          </button>
          <button onClick={filtExpenses.onPress} style={filtExpenses.style}>
            {filtExpenses.label}
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
          {movList.map((t, i) => (
            <TransactionRow key={i} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
