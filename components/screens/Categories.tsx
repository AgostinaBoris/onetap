import { BackButton } from "../BackButton";
import { CategoryTile } from "../CategoryTile";
import type { Tile } from "@/lib/types";

export function Categories({
  onBack,
  catExpenses,
  catIncome,
}: {
  onBack: () => void;
  catExpenses: Tile[];
  catIncome: Tile[];
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <BackButton onClick={onBack} />
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 24, color: "#F1F5F9", letterSpacing: "-.02em" }}>
            Categories
          </div>
        </div>
        <button
          style={{
            width: "100%",
            height: 56,
            borderRadius: 14,
            border: "1.5px dashed rgba(51,144,253,.4)",
            background: "rgba(51,144,253,.06)",
            color: "#3390FD",
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
          }}
        >
          <i className="ph-bold ph-plus" style={{ fontSize: 18 }} />
          New category
        </button>
        <div
          style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".09em", color: "#5B6578", margin: "24px 2px 12px" }}
        >
          EXPENSES
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11 }}>
          {catExpenses.map((c) => (
            <CategoryTile key={c.key} c={c} />
          ))}
        </div>
        <div
          style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".09em", color: "#5B6578", margin: "24px 2px 12px" }}
        >
          INCOME
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11 }}>
          {catIncome.map((c) => (
            <CategoryTile key={c.key} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
