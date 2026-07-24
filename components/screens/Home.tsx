import type { CSSProperties } from "react";
import { Pressable } from "../Pressable";
import { TransactionRow } from "../TransactionRow";
import type { TransactionRowData } from "@/lib/types";

interface HomeChip {
  label: string;
  icon: string;
  iconWrap: CSSProperties;
  onPress: () => void;
  chipStyle: CSSProperties;
}

export function Home({
  userName,
  showMenu,
  onOpenMenu,
  onCloseMenu,
  onOpenCategorias,
  onGoBalance,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  totalBalanceText,
  onOpenIncome,
  onOpenExpense,
  catChips,
  onSeeAllCategories,
  onSeeAllRecent,
  recentTx,
}: {
  userName: string;
  showMenu: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onOpenCategorias: () => void;
  onGoBalance: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  totalBalanceText: string;
  onOpenIncome: () => void;
  onOpenExpense: () => void;
  catChips: HomeChip[];
  onSeeAllCategories: () => void;
  onSeeAllRecent: () => void;
  recentTx: TransactionRowData[];
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 118px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 24,
                background: "linear-gradient(150deg,#3390FD,#2563EB)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 600,
                fontSize: 17,
                color: "#fff",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-cropped.png"
                alt=""
                style={{ width: "130%", height: "130%", objectFit: "cover", margin: "0 auto" }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 13, color: "#94A3B8" }}>
                Welcome back,
              </div>
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#F1F5F9",
                  letterSpacing: "-.02em",
                }}
              >
                {userName}
              </div>
            </div>
          </div>
          <Pressable
            onClick={onOpenMenu}
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              border: "1px solid rgba(241,245,249,.08)",
              background: "#0C0E12",
              color: "#F1F5F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              transition: "transform .18s,background .2s",
            }}
            hoverStyle={{ background: "#141821", transform: "translateY(-1px)" }}
            activeStyle={{ transform: "scale(.92)" }}
          >
            <i className="ph-bold ph-list" style={{ fontSize: 22 }} />
          </Pressable>
          {showMenu && (
            <>
              <div onClick={onCloseMenu} style={{ position: "fixed", inset: 0, zIndex: 90, background: "transparent" }} />
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  right: 0,
                  zIndex: 100,
                  width: 260,
                  borderRadius: 14,
                  background: "#0C0E12",
                  border: "1px solid rgba(241,245,249,.08)",
                  boxShadow: "0 12px 32px rgba(0,0,0,.6)",
                  animation: "cardIn .25s ease",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderBottom: "1px solid rgba(241,245,249,.06)",
                  }}
                >
                  <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 13, color: "#94A3B8" }}>
                    Menu
                  </span>
                  <Pressable
                    onClick={onCloseMenu}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 10,
                      border: "none",
                      background: "rgba(241,245,249,.06)",
                      color: "#F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    hoverStyle={{ background: "#141821" }}
                  >
                    <i className="ph-bold ph-x" style={{ fontSize: 15 }} />
                  </Pressable>
                </div>
                <MenuItem label="Categories" onClick={onOpenCategorias} />
                <MenuItem label="Spending by Category" onClick={onGoBalance} />
                <MenuItem label="Settings" onClick={onOpenSettings} />
                <MenuItem label="Help" onClick={onOpenHelp} borderBottom={false} />
                <Pressable
                  onClick={onLogout}
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    color: "#F87171",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "background .2s",
                    display: "block",
                  }}
                  hoverStyle={{ background: "#141821" }}
                >
                  Log out
                </Pressable>
              </div>
            </>
          )}
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: 22,
            padding: "20px 22px 16px",
            background: "linear-gradient(165deg,#0E1219,#080A0F)",
            border: "1px solid rgba(241,245,249,.08)",
            overflow: "hidden",
            boxShadow: "0 18px 44px -22px rgba(0,0,0,.6)",
            animation: "cardIn .55s ease .04s backwards",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -50,
              right: -40,
              width: 170,
              height: 170,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(51,144,253,.09),transparent 74%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: ".09em",
                color: "#94A3B8",
              }}
            >
              TOTAL BALANCE
            </div>
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 500,
                fontSize: 33,
                lineHeight: 1.05,
                color: "#F5F7FB",
                letterSpacing: "-.02em",
                marginTop: 6,
              }}
            >
              {totalBalanceText}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 10,
                padding: "5px 11px",
                borderRadius: 999,
                background: "rgba(25,230,128,.14)",
              }}
            >
              <i className="ph-fill ph-trend-up" style={{ fontSize: 14, color: "#19E680" }} />
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 13, color: "#19E680" }}>
                +2.5% this month
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <Pressable
                onClick={onOpenIncome}
                style={{
                  flex: 1,
                  height: 46,
                  border: "1px solid rgba(25,230,128,.28)",
                  borderRadius: 14,
                  background: "rgba(25,230,128,.14)",
                  color: "#19E680",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "transform .15s,filter .2s",
                }}
                hoverStyle={{ filter: "brightness(1.22)" }}
                activeStyle={{ transform: "scale(.96)" }}
              >
                <i className="ph-bold ph-plus" style={{ fontSize: 17 }} />
                Income
              </Pressable>
              <Pressable
                onClick={onOpenExpense}
                style={{
                  flex: 1,
                  height: 46,
                  border: "1px solid rgba(248,113,113,.28)",
                  borderRadius: 14,
                  background: "rgba(248,113,113,.14)",
                  color: "#F87171",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "transform .15s,filter .2s",
                }}
                hoverStyle={{ filter: "brightness(1.22)" }}
                activeStyle={{ transform: "scale(.96)" }}
              >
                <i className="ph-bold ph-minus" style={{ fontSize: 17 }} />
                Expense
              </Pressable>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "28px 2px 14px" }}>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#F1F5F9",
              letterSpacing: "-.02em",
            }}
          >
            Categories
          </div>
          <SeeAllLink onClick={onSeeAllCategories} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
          {catChips.map((c) => (
            <Pressable
              key={c.label}
              onClick={c.onPress}
              style={c.chipStyle}
              hoverStyle={{ transform: "translateY(-4px) scale(1.04)", border: "1px solid rgba(51,144,253,.4)", background: "#12161d" }}
              activeStyle={{ transform: "scale(.92)" }}
            >
              <div style={c.iconWrap}>
                <i className={`ph ph-${c.icon}`} style={{ fontSize: 17 }} />
              </div>
              <span
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#94A3B8",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {c.label}
              </span>
            </Pressable>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "28px 2px 14px" }}>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#F1F5F9",
              letterSpacing: "-.02em",
            }}
          >
            Recent activity
          </div>
          <SeeAllLink onClick={onSeeAllRecent} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {recentTx.map((t, i) => (
            <TransactionRow key={i} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ label, onClick, borderBottom = true }: { label: string; onClick: () => void; borderBottom?: boolean }) {
  return (
    <Pressable
      onClick={onClick}
      style={{
        width: "100%",
        padding: "16px 18px",
        textAlign: "left",
        background: "none",
        border: "none",
        borderBottom: borderBottom ? "1px solid rgba(241,245,249,.06)" : "none",
        color: "#F1F5F9",
        fontFamily: "Instrument Sans, sans-serif",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        transition: "background .2s",
        display: "block",
      }}
      hoverStyle={{ background: "#141821", color: "#3390FD" }}
    >
      {label}
    </Pressable>
  );
}

function SeeAllLink({ onClick }: { onClick: () => void }) {
  return (
    <Pressable
      onClick={onClick}
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
  );
}
