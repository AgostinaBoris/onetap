import type { CSSProperties } from "react";
import { BackButton } from "../BackButton";
import { BoltIcon } from "../BoltIcon";
import { Pressable } from "../Pressable";
import type { NumpadKey, Tile } from "@/lib/types";

export function NewMovement({
  onBack,
  onOpenMenu,
  amountText,
  amountColor,
  amountModalOpen,
  onOpenAmount,
  onCloseAmount,
  dateText,
  dateModalOpen,
  onOpenDate,
  onCloseDate,
  calendarMonthLabel,
  onPrevMonth,
  onNextMonth,
  calendarCells,
  selectedDate,
  todayDate,
  onSelectDate,
  isSameDay,
  subtitle,
  gridCats,
  categorySelected,
  descriptionValue,
  onDescriptionChange,
  keys,
  onConfirm,
  confirmStyle,
  canConfirm,
}: {
  onBack: () => void;
  onOpenMenu: () => void;
  amountText: string;
  amountColor: string;
  amountModalOpen: boolean;
  onOpenAmount: () => void;
  onCloseAmount: () => void;
  dateText: string;
  dateModalOpen: boolean;
  onOpenDate: () => void;
  onCloseDate: () => void;
  calendarMonthLabel: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  calendarCells: (Date | null)[];
  selectedDate: Date;
  todayDate: Date;
  onSelectDate: (d: Date) => void;
  isSameDay: (a: Date, b: Date) => boolean;
  subtitle: string;
  gridCats: Tile[];
  categorySelected: boolean;
  descriptionValue: string;
  onDescriptionChange: (v: string) => void;
  keys: NumpadKey[];
  onConfirm: () => void;
  confirmStyle: CSSProperties;
  canConfirm: boolean;
}) {
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 130px", display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <BackButton onClick={onBack} />
          <BoltIcon size={26} />
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
              transition: "transform .18s,background .2s",
            }}
            hoverStyle={{ background: "#141821", transform: "translateY(-1px)" }}
            activeStyle={{ transform: "scale(.92)" }}
          >
            <i className="ph-bold ph-list" style={{ fontSize: 22 }} />
          </Pressable>
        </div>

        <div style={{ textAlign: "center", margin: "26px 0 0" }}>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: ".09em", color: "#94A3B8" }}>
            AMOUNT
          </div>
          <Pressable
            as="div"
            onClick={onOpenAmount}
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 700,
              fontSize: 46,
              color: amountColor,
              letterSpacing: "-.03em",
              marginTop: 6,
              cursor: "pointer",
              display: "inline-block",
            }}
            activeStyle={{ transform: "scale(.97)" }}
          >
            {amountText}
          </Pressable>
          <div style={{ width: 46, height: 2, borderRadius: 2, background: "rgba(148,163,184,.3)", margin: "14px auto 0" }} />
        </div>

        <Pressable
          as="div"
          onClick={onOpenDate}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 22,
            padding: "13px 15px",
            borderRadius: 16,
            background: "#0C0E12",
            border: "1px solid rgba(241,245,249,.08)",
            cursor: "pointer",
            transition: "background .2s",
          }}
          hoverStyle={{ background: "#141821" }}
          activeStyle={{ transform: "scale(.99)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(51,144,253,.16)",
                border: "1px solid rgba(51,144,253,.4)",
                color: "#3390FD",
                flexShrink: 0,
              }}
            >
              <i className="ph-bold ph-calendar" style={{ fontSize: 17 }} />
            </div>
            <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 15, color: "#CBD5E1" }}>
              Date
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 15, color: "#F1F5F9" }}>
              {dateText}
            </span>
            <i className="ph-bold ph-caret-right" style={{ fontSize: 15, color: "#5B6578" }} />
          </div>
        </Pressable>

        <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".09em", color: "#5B6578", margin: "26px 2px 12px" }}>
          {subtitle}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {gridCats.map((c) => (
            <Pressable
              key={c.key}
              as="div"
              onClick={c.onPress}
              style={c.tileStyle}
              hoverStyle={{ transform: "translateY(-4px) scale(1.04)", border: "1.5px solid rgba(140,200,255,.7)" }}
              activeStyle={{ transform: "scale(.92)" }}
            >
              <div style={c.iconWrap}>
                <i className={`ph ph-${c.icon}`} style={{ fontSize: 17 }} />
              </div>
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 11.5, color: "#CBD5E1" }}>
                {c.label}
              </span>
            </Pressable>
          ))}
        </div>

        {categorySelected && (
          <div style={{ marginBottom: 20, animation: "cardIn .35s ease" }}>
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: ".09em",
                color: "#5B6578",
                margin: "0 2px 10px",
              }}
            >
              DESCRIPTION
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
              }}
            >
              <i className="ph-duotone ph-note-pencil" style={{ fontSize: 20, color: "#3390FD", flexShrink: 0 }} />
              <input
                type="text"
                value={descriptionValue}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="What's this for?"
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
          </div>
        )}

        <Pressable
          onClick={onConfirm}
          style={confirmStyle}
          hoverStyle={canConfirm ? { filter: "brightness(1.1)" } : undefined}
          activeStyle={canConfirm ? { transform: "scale(.985)" } : undefined}
        >
          Confirm
        </Pressable>
      </div>

      {amountModalOpen && (
        <>
          <div
            onClick={onCloseAmount}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 60, animation: "overlayIn .2s ease" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 61,
              borderRadius: "24px 24px 0 0",
              background: "#0A0C10",
              border: "1px solid rgba(241,245,249,.08)",
              borderBottom: "none",
              padding: "16px 18px 26px",
              boxShadow: "0 -20px 50px -14px rgba(0,0,0,.7)",
              animation: "sheetUp .28s cubic-bezier(.2,.9,.3,1)",
            }}
          >
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(241,245,249,.16)", margin: "0 auto 16px" }} />
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: ".09em", color: "#94A3B8" }}>
                AMOUNT
              </div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 38, color: amountColor, letterSpacing: "-.03em", marginTop: 4 }}>
                {amountText}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {keys.map((k, i) => (
                <Pressable
                  key={i}
                  onClick={k.onPress}
                  style={{
                    height: 50,
                    borderRadius: 15,
                    border: "1px solid rgba(241,245,249,.06)",
                    background: "#0C0E12",
                    color: "#F1F5F9",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform .1s,background .15s",
                  }}
                  hoverStyle={{ background: "#141821" }}
                  activeStyle={{ transform: "scale(.94)" }}
                >
                  {k.isDel ? <i className="ph-bold ph-backspace" style={{ fontSize: 22 }} /> : k.label}
                </Pressable>
              ))}
            </div>
            <Pressable
              onClick={onCloseAmount}
              style={{
                width: "100%",
                height: 52,
                border: "none",
                borderRadius: 16,
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                color: "#F1F5F9",
                background: "rgba(148,163,184,.22)",
              }}
              hoverStyle={{ background: "rgba(148,163,184,.3)" }}
              activeStyle={{ transform: "scale(.98)" }}
            >
              Done
            </Pressable>
          </div>
        </>
      )}

      {dateModalOpen && (
        <>
          <div
            onClick={onCloseDate}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 60, animation: "overlayIn .2s ease" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 61,
              borderRadius: "24px 24px 0 0",
              background: "#0A0C10",
              border: "1px solid rgba(241,245,249,.08)",
              borderBottom: "none",
              padding: "16px 18px 26px",
              boxShadow: "0 -20px 50px -14px rgba(0,0,0,.7)",
              animation: "sheetUp .28s cubic-bezier(.2,.9,.3,1)",
            }}
          >
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(241,245,249,.16)", margin: "0 auto 16px" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <Pressable
                onClick={onPrevMonth}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  border: "1px solid rgba(241,245,249,.08)",
                  background: "#0C0E12",
                  color: "#F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                hoverStyle={{ background: "#141821" }}
                activeStyle={{ transform: "scale(.92)" }}
              >
                <i className="ph-bold ph-caret-left" style={{ fontSize: 15 }} />
              </Pressable>
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 16, color: "#F1F5F9" }}>
                {calendarMonthLabel}
              </span>
              <Pressable
                onClick={onNextMonth}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  border: "1px solid rgba(241,245,249,.08)",
                  background: "#0C0E12",
                  color: "#F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                hoverStyle={{ background: "#141821" }}
                activeStyle={{ transform: "scale(.92)" }}
              >
                <i className="ph-bold ph-caret-right" style={{ fontSize: 15 }} />
              </Pressable>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 6 }}>
              {weekdayLabels.map((w, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    color: "#5B6578",
                    padding: "4px 0",
                  }}
                >
                  {w}
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 18 }}>
              {calendarCells.map((d, i) => {
                if (!d) return <div key={i} />;
                const selected = isSameDay(d, selectedDate);
                const isToday = isSameDay(d, todayDate);
                return (
                  <Pressable
                    key={i}
                    as="div"
                    onClick={() => onSelectDate(d)}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontFamily: "Instrument Sans, sans-serif",
                      fontWeight: selected ? 700 : 600,
                      fontSize: 14,
                      color: selected ? "#fff" : "#CBD5E1",
                      background: selected ? "#3390FD" : "transparent",
                      border: !selected && isToday ? "1px solid rgba(51,144,253,.6)" : "1px solid transparent",
                      transition: "background .15s,transform .1s",
                    }}
                    hoverStyle={!selected ? { background: "rgba(241,245,249,.08)" } : undefined}
                    activeStyle={{ transform: "scale(.9)" }}
                  >
                    {d.getDate()}
                  </Pressable>
                );
              })}
            </div>

            <Pressable
              onClick={onCloseDate}
              style={{
                width: "100%",
                height: 52,
                border: "none",
                borderRadius: 16,
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                color: "#F1F5F9",
                background: "rgba(148,163,184,.22)",
              }}
              hoverStyle={{ background: "rgba(148,163,184,.3)" }}
              activeStyle={{ transform: "scale(.98)" }}
            >
              Done
            </Pressable>
          </div>
        </>
      )}
    </div>
  );
}
