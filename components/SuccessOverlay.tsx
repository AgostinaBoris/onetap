import { CTAButton } from "./CTAButton";

export function SuccessOverlay({
  title,
  amountText,
  color,
  ringBg,
  catLabel,
  onContinue,
}: {
  title: string;
  amountText: string;
  color: string;
  ringBg: string;
  catLabel: string;
  onContinue: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 60,
        background: "rgba(2,3,5,.86)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        animation: "screenIn .3s ease",
      }}
    >
      <div
        style={{
          width: 104,
          height: 104,
          borderRadius: "50%",
          background: ringBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "checkPop .5s cubic-bezier(.2,1.3,.4,1)",
        }}
      >
        <i className="ph-fill ph-check" style={{ fontSize: 52, color }} />
      </div>
      <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 26, color: "#F1F5F9", marginTop: 26, letterSpacing: "-.02em" }}>
        {title}
      </div>
      <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 32, color, marginTop: 6 }}>{amountText}</div>
      <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "#94A3B8", marginTop: 6 }}>
        {catLabel}
      </div>
      <CTAButton onClick={onContinue} style={{ marginTop: 36, height: 56, borderRadius: 14, fontSize: 16 }}>
        Done
      </CTAButton>
    </div>
  );
}
