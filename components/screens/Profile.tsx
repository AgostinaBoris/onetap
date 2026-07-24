import { Pressable } from "../Pressable";

export function Profile({
  totalBalanceText,
  savingsText,
  onOpenBalance,
  onOpenSettings,
  onLogout,
}: {
  totalBalanceText: string;
  savingsText: string;
  onOpenBalance: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}) {
  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "64px 22px 118px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 45,
              background: "linear-gradient(150deg,#3390FD,#2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 600,
              fontSize: 34,
              color: "#fff",
              boxShadow: "0 14px 34px -10px rgba(37,99,235,.6)",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar-cropped.png"
              alt=""
              style={{ width: "140%", height: "140%", objectFit: "cover", margin: "0 auto" }}
            />
          </div>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 24, color: "#F1F5F9", marginTop: 16, letterSpacing: "-.02em" }}>
            Agostina Aldana
          </div>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#94A3B8", marginTop: 3 }}>
            aldana@onetap.com
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 16,
              background: "#0C0E12",
              border: "1px solid rgba(241,245,249,.06)",
              animation: "cardIn .5s ease .05s backwards",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: ".08em", color: "#94A3B8" }}>
              BALANCE
            </div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 22, color: "#F1F5F9", marginTop: 6 }}>
              {totalBalanceText}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 16,
              background: "#0C0E12",
              border: "1px solid rgba(241,245,249,.06)",
              animation: "cardIn .5s ease .05s backwards",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: ".08em", color: "#94A3B8" }}>
              SAVINGS
            </div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 22, color: "#19E680", marginTop: 6 }}>
              {savingsText}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
          <ProfileRow icon="trend-up" iconColor="#F87171" iconBg="rgba(248,113,113,.12)" label="Monthly expenses" onClick={onOpenBalance} />
          <ProfileRow icon="trend-down" iconColor="#19E680" iconBg="rgba(25,230,128,.12)" label="Monthly income" onClick={onOpenBalance} />
          <ProfileRow icon="gear-six" iconColor="#3390FD" iconBg="rgba(51,144,253,.12)" label="Settings" onClick={onOpenSettings} />
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
              marginTop: 4,
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

function ProfileRow({
  icon,
  iconColor,
  iconBg,
  label,
  onClick,
}: {
  icon: string;
  iconColor: string;
  iconBg: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Pressable
      onClick={onClick}
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
      <div style={{ width: 42, height: 42, borderRadius: 13, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className={`ph-duotone ph-${icon}`} style={{ fontSize: 22, color: iconColor }} />
      </div>
      <span style={{ flex: 1, fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>{label}</span>
      <i className="ph-bold ph-caret-right" style={{ fontSize: 16, color: "#5B6578" }} />
    </Pressable>
  );
}
