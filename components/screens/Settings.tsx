import type { ReactNode } from "react";
import { BackButton } from "../BackButton";
import { Pressable } from "../Pressable";
import { knStyle, swStyle } from "@/lib/helpers";

export function Settings({
  onBack,
  notif,
  onToggleNotif,
  biometria,
  onToggleBiometria,
  resumen,
  onToggleResumen,
  language,
  onToggleLanguage,
  onLogout,
}: {
  onBack: () => void;
  notif: boolean;
  onToggleNotif: () => void;
  biometria: boolean;
  onToggleBiometria: () => void;
  resumen: boolean;
  onToggleResumen: () => void;
  language: string;
  onToggleLanguage: () => void;
  onLogout: () => void;
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "60px 22px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <BackButton onClick={onBack} />
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 24, color: "#F1F5F9", letterSpacing: "-.02em" }}>
            Settings
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SettingsRow icon="bell" label="Notifications">
            <button onClick={onToggleNotif} style={swStyle(notif)}>
              <div style={knStyle(notif)} />
            </button>
          </SettingsRow>
          <SettingsRow icon="fingerprint" label="Biometric login">
            <button onClick={onToggleBiometria} style={swStyle(biometria)}>
              <div style={knStyle(biometria)} />
            </button>
          </SettingsRow>
          <SettingsRow icon="envelope-open" label="Monthly summary">
            <button onClick={onToggleResumen} style={swStyle(resumen)}>
              <div style={knStyle(resumen)} />
            </button>
          </SettingsRow>
          <Pressable
            onClick={onToggleLanguage}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "15px 16px",
              borderRadius: 14,
              background: "#0C0E12",
              border: "1px solid rgba(241,245,249,.06)",
              animation: "cardIn .5s ease .05s backwards",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(51,144,253,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ph-duotone ph-translate" style={{ fontSize: 22, color: "#3390FD" }} />
            </div>
            <span style={{ flex: 1, fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>
              Language
            </span>
            <span
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#3390FD",
                padding: "5px 12px",
                borderRadius: 999,
                background: "rgba(51,144,253,.12)",
              }}
            >
              {language}
            </span>
          </Pressable>
          <Pressable
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "15px 16px",
              borderRadius: 14,
              background: "transparent",
              border: "1px solid rgba(248,113,113,.2)",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              marginTop: 6,
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(248,113,113,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ph-duotone ph-sign-out" style={{ fontSize: 22, color: "#F87171" }} />
            </div>
            <span style={{ flex: 1, fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F87171" }}>
              Log out
            </span>
          </Pressable>
        </div>
      </div>
    </div>
  );
}

function SettingsRow({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "15px 16px",
        borderRadius: 14,
        background: "#0C0E12",
        border: "1px solid rgba(241,245,249,.06)",
        animation: "cardIn .5s ease .05s backwards",
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(51,144,253,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className={`ph-duotone ph-${icon}`} style={{ fontSize: 22, color: "#3390FD" }} />
      </div>
      <span style={{ flex: 1, fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>{label}</span>
      {children}
    </div>
  );
}
