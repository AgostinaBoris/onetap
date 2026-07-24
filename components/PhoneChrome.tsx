import type { ReactNode } from "react";

/**
 * The device frame + fake status bar wrapping every screen, matching the
 * source app's marketing-page presentation of the mobile mock.
 */
export function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "48px 20px",
        background:
          "radial-gradient(1200px 760px at 50% -8%, #0a0e15 0%, #05070b 46%, #010203 100%)",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 6,
            background: "linear-gradient(155deg,#6BB3FE,#2563EB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(51,144,253,.45)",
          }}
        >
          <i className="ph-fill ph-lightning" style={{ fontSize: 19, color: "#eaf3ff" }} />
        </div>
        <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 19, color: "#F1F5F9", letterSpacing: "-.02em" }}>
          OneTap
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 480,
          aspectRatio: "402/858",
          borderRadius: 56,
          padding: 11,
          background: "linear-gradient(160deg,#10141d,#010203)",
          boxShadow: "0 40px 90px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(51,144,253,.08), inset 0 0 0 1px rgba(255,255,255,.03)",
          flexShrink: 0,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 46,
            overflow: "hidden",
            background: "#040507",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 52,
              zIndex: 50,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "0 30px 6px",
              pointerEvents: "none",
              background: "linear-gradient(180deg,rgba(4,5,7,.95),rgba(4,5,7,0))",
            }}
          >
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", letterSpacing: ".02em" }}>
              9:41
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#F1F5F9" }}>
              <i className="ph-fill ph-cell-signal-full" style={{ fontSize: 16 }} />
              <i className="ph-fill ph-wifi-high" style={{ fontSize: 16 }} />
              <i className="ph-fill ph-battery-full" style={{ fontSize: 18 }} />
            </div>
          </div>

          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
