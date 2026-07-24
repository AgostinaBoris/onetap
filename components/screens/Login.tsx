import { BackButton } from "../BackButton";
import { CTAButton } from "../CTAButton";

export function Login({ onBack, onSignIn }: { onBack: () => void; onSignIn: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        animation: "screenIn .4s ease",
        display: "flex",
        flexDirection: "column",
        padding: "70px 32px 40px",
      }}
    >
      <BackButton onClick={onBack} />
      <div style={{ marginTop: 34 }}>
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 34,
            color: "#F1F5F9",
            letterSpacing: "-.03em",
          }}
        >
          Welcome back 👋
        </div>
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "#94A3B8",
            marginTop: 8,
          }}
        >
          Sign in to keep managing your money.
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#94A3B8",
              paddingLeft: 4,
            }}
          >
            Email
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
            <i className="ph-duotone ph-envelope-simple" style={{ fontSize: 20, color: "#3390FD" }} />
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 16, color: "#F1F5F9" }}>
              aldana@onetap.com
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#94A3B8",
              paddingLeft: 4,
            }}
          >
            Password
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
            <i className="ph-duotone ph-lock-simple" style={{ fontSize: 20, color: "#3390FD" }} />
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#F1F5F9",
                letterSpacing: ".12em",
              }}
            >
              ••••••••
            </div>
            <i className="ph-duotone ph-eye" style={{ fontSize: 20, color: "#5B6578", marginLeft: "auto" }} />
          </div>
        </div>
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: "#3390FD",
            textAlign: "right",
            padding: "2px 4px",
          }}
        >
          Forgot your password?
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <CTAButton onClick={onSignIn}>Sign in</CTAButton>
    </div>
  );
}
