import { Pressable } from "../Pressable";
import { TransactionRow } from "../TransactionRow";
import type { TransactionRowData } from "@/lib/types";

export function Balance({
  onClose,
  balNetoText,
  balVsLastMonthText,
  onPrevMonth,
  onNextMonth,
  monthLabel,
  balIncomeText,
  balExpensesText,
  balSavingsRateText,
  onSeeAllRecent,
  balRecent,
}: {
  onClose: () => void;
  balNetoText: string;
  balVsLastMonthText: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  monthLabel: string;
  balIncomeText: string;
  balExpensesText: string;
  balSavingsRateText: string;
  onSeeAllRecent: () => void;
  balRecent: TransactionRowData[];
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 118px" }}>
        <Pressable
          onClick={onClose}
          style={{
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
            transition: "filter .2s,transform .15s",
            marginBottom: 16,
          }}
          hoverStyle={{ filter: "brightness(1.4)" }}
          activeStyle={{ transform: "scale(.95)" }}
        >
          <i className="ph-bold ph-caret-left" style={{ fontSize: 20 }} />
        </Pressable>
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: ".09em", color: "#94A3B8" }}
          >
            NET BALANCE
          </div>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 600,
              fontSize: 33,
              color: "#F5F7FB",
              letterSpacing: "-.02em",
              marginTop: 6,
            }}
          >
            {balNetoText}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 10,
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(25,230,128,.14)",
            }}
          >
            <i className="ph-fill ph-trend-up" style={{ fontSize: 13, color: "#19E680" }} />
            <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 13, color: "#19E680" }}>
              {balVsLastMonthText} this month
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, margin: "22px 0" }}>
          <button
            onClick={onPrevMonth}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(51,144,253,.28)",
              background: "rgba(51,144,253,.1)",
              color: "#3390FD",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="ph-bold ph-caret-left" />
          </button>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: ".05em",
              color: "#F1F5F9",
              minWidth: 132,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {monthLabel}
          </div>
          <button
            onClick={onNextMonth}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid rgba(51,144,253,.28)",
              background: "rgba(51,144,253,.1)",
              color: "#3390FD",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="ph-bold ph-caret-right" />
          </button>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 16,
              background: "#0C0E12",
              border: "1px solid rgba(241,245,249,.06)",
              textAlign: "center",
              animation: "cardIn .5s ease .05s backwards",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 999,
                background: "rgba(25,230,128,.16)",
                color: "#19E680",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              Income
            </span>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 22, color: "#F1F5F9", marginTop: 10 }}>
              {balIncomeText}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 16,
              background: "#0C0E12",
              border: "1px solid rgba(241,245,249,.06)",
              textAlign: "center",
              animation: "cardIn .5s ease .05s backwards",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 999,
                background: "rgba(248,113,113,.16)",
                color: "#F87171",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              Expenses
            </span>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 22, color: "#F1F5F9", marginTop: 10 }}>
              {balExpensesText}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
            padding: "16px 18px",
            borderRadius: 16,
            background: "#0C0E12",
            border: "1px solid rgba(241,245,249,.06)",
          }}
        >
          <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 14, color: "#94A3B8" }}>
            Savings rate
          </span>
          <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>
            {balSavingsRateText}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "28px 2px 14px" }}>
          <div
            style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 18, color: "#F1F5F9", letterSpacing: "-.02em" }}
          >
            Recent Activity
          </div>
          <Pressable
            onClick={onSeeAllRecent}
            style={{
              background: "none",
              border: "none",
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#3390FD",
              cursor: "pointer",
              transition: "filter .2s,transform .15s",
            }}
            hoverStyle={{ filter: "brightness(1.4)" }}
            activeStyle={{ transform: "scale(.95)" }}
          >
            See all
          </Pressable>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {balRecent.map((t, i) => (
            <TransactionRow key={i} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
