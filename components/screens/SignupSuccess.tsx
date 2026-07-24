import { CTAButton } from "../CTAButton";

export function SignupSuccess({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        animation: "screenIn .3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: "radial-gradient(520px 440px at 50% 24%, rgba(51,144,253,.16), transparent 60%)",
      }}
    >
      <div
        style={{
          width: 104,
          height: 104,
          borderRadius: "50%",
          background: "rgba(25,230,128,.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "checkPop .5s cubic-bezier(.2,1.3,.4,1)",
        }}
      >
        <i className="ph-fill ph-check" style={{ fontSize: 52, color: "#19E680" }} />
      </div>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontWeight: 600,
          fontSize: 26,
          color: "#F1F5F9",
          marginTop: 26,
          letterSpacing: "-.02em",
          textAlign: "center",
        }}
      >
        Account created successfully
      </div>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontWeight: 500,
          fontSize: 15,
          color: "#94A3B8",
          marginTop: 8,
          textAlign: "center",
        }}
      >
        You're all set. Let's start tracking your money.
      </div>
      <CTAButton onClick={onContinue} style={{ marginTop: 36, height: 56, borderRadius: 14, fontSize: 16 }}>
        Continue
      </CTAButton>
    </div>
  );
}
