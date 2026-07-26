import type { CSSProperties } from "react";
import { BackButton } from "../BackButton";
import { CategoryTile } from "../CategoryTile";
import { Pressable } from "../Pressable";
import type { Tile, TransactionType } from "@/lib/types";

export function Categories({
  onBack,
  catExpenses,
  catIncome,
  sheetOpen,
  onOpenSheet,
  onCloseSheet,
  catType,
  onSetCatType,
  catName,
  onCatNameChange,
  iconChoices,
  catIcon,
  onSelectIcon,
  onSave,
  canSave,
}: {
  onBack: () => void;
  catExpenses: Tile[];
  catIncome: Tile[];
  sheetOpen: boolean;
  onOpenSheet: () => void;
  onCloseSheet: () => void;
  catType: TransactionType;
  onSetCatType: (t: TransactionType) => void;
  catName: string;
  onCatNameChange: (v: string) => void;
  iconChoices: string[];
  catIcon: string | null;
  onSelectIcon: (icon: string) => void;
  onSave: () => void;
  canSave: boolean;
}) {
  const typeBtnStyle = (active: boolean): CSSProperties => ({
    flex: 1,
    height: 44,
    borderRadius: 14,
    border: active ? "1px solid rgba(51,144,253,.5)" : "1px solid rgba(241,245,249,.08)",
    background: active ? "rgba(51,144,253,.16)" : "transparent",
    color: active ? "#3390FD" : "#94A3B8",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "all .18s",
  });

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
          onClick={onOpenSheet}
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

      {sheetOpen && (
        <>
          <div
            onClick={onCloseSheet}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 60, animation: "overlayIn .2s ease" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 61,
              maxHeight: "82%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "24px 24px 0 0",
              background: "#0A0C10",
              border: "1px solid rgba(241,245,249,.08)",
              borderBottom: "none",
              padding: "16px 18px 26px",
              boxShadow: "0 -20px 50px -14px rgba(0,0,0,.7)",
              animation: "sheetUp .28s cubic-bezier(.2,.9,.3,1)",
            }}
          >
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(241,245,249,.16)", margin: "0 auto 16px", flexShrink: 0 }} />

            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#F1F5F9",
                textAlign: "center",
                marginBottom: 18,
                flexShrink: 0,
              }}
            >
              New category
            </div>

            <div className="otscroll" style={{ overflowY: "auto" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                <Pressable onClick={() => onSetCatType("gasto")} style={typeBtnStyle(catType === "gasto")}>
                  Expense
                </Pressable>
                <Pressable onClick={() => onSetCatType("ingreso")} style={typeBtnStyle(catType === "ingreso")}>
                  Income
                </Pressable>
              </div>

              <div
                style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".09em", color: "#5B6578", margin: "0 2px 10px" }}
              >
                NAME
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  height: 56,
                  padding: "0 18px",
                  borderRadius: 14,
                  background: "#0C0E12",
                  border: "1px solid rgba(241,245,249,.08)",
                  marginBottom: 18,
                }}
              >
                <i className="ph-duotone ph-tag" style={{ fontSize: 20, color: "#3390FD", flexShrink: 0 }} />
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => onCatNameChange(e.target.value)}
                  placeholder="e.g. Pets"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#F1F5F9",
                  }}
                />
              </div>

              <div
                style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".09em", color: "#5B6578", margin: "0 2px 10px" }}
              >
                ICON
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 20 }}>
                {iconChoices.map((icon) => {
                  const selected = catIcon === icon;
                  return (
                    <Pressable
                      key={icon}
                      as="div"
                      onClick={() => onSelectIcon(icon)}
                      style={{
                        aspectRatio: "1",
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        background: selected ? "rgba(51,144,253,.16)" : "#0C0E12",
                        border: selected ? "1.5px solid rgba(51,144,253,.8)" : "1px solid rgba(241,245,249,.08)",
                        color: selected ? "#3390FD" : "#CBD5E1",
                        transition: "all .15s",
                      }}
                      hoverStyle={!selected ? { background: "#141821" } : undefined}
                      activeStyle={{ transform: "scale(.9)" }}
                    >
                      <i className={`ph ph-${icon}`} style={{ fontSize: 19 }} />
                    </Pressable>
                  );
                })}
              </div>
            </div>

            <Pressable
              onClick={onSave}
              style={{
                width: "100%",
                height: 56,
                border: "none",
                borderRadius: 16,
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                cursor: canSave ? "pointer" : "default",
                color: canSave ? "#fff" : "#5B6578",
                background: canSave ? "linear-gradient(150deg,#3390FD,#2563EB)" : "#0C0E12",
                boxShadow: canSave ? "0 14px 30px -8px rgba(37,99,235,.5)" : "none",
                transition: "all .2s",
                flexShrink: 0,
                marginTop: 4,
              }}
              hoverStyle={canSave ? { filter: "brightness(1.1)" } : undefined}
              activeStyle={canSave ? { transform: "scale(.985)" } : undefined}
            >
              Save category
            </Pressable>
          </div>
        </>
      )}
    </div>
  );
}
