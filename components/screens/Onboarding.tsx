import { Pressable } from "../Pressable";

export function Onboarding({
  boltSpinning,
  onSpinBolt,
  onLogin,
  onSignup,
  onGuest,
}: {
  boltSpinning: boolean;
  onSpinBolt: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onGuest: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        animation: "screenIn .4s ease",
        display: "flex",
        flexDirection: "column",
        padding: "72px 32px 48px",
        background:
          "radial-gradient(520px 440px at 50% 24%, rgba(51,144,253,.16), transparent 60%)",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 700,
            fontSize: 36,
            color: "#3390FD",
            letterSpacing: "-.02em",
            marginBottom: 34,
          }}
        >
          OneTap
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              animation: "logoIn .7s cubic-bezier(.2,.9,.3,1) both, floatSoft 5.5s ease-in-out .7s infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -24,
                borderRadius: 54,
                background: "radial-gradient(circle, rgba(51,144,253,.34), transparent 70%)",
                filter: "blur(22px)",
                animation: "glowBreath 4s ease-in-out infinite",
              }}
            />
            <Pressable
              as="div"
              onClick={onSpinBolt}
              style={{
                position: "relative",
                width: 140,
                height: 140,
                borderRadius: 18,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(125% 120% at 50% 16%, #163a6e 0%, #0c1f3e 46%, #060e1f 100%)",
                border: "2px solid rgba(90,170,255,.8)",
                animation: "borderGlow 4s ease-in-out infinite",
                cursor: "pointer",
              }}
              activeStyle={{ transform: "scale(.96)" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60%",
                  left: "-10%",
                  width: "52%",
                  height: "220%",
                  background: "linear-gradient(90deg,transparent,rgba(205,232,255,.6),transparent)",
                  transform: "rotate(18deg)",
                  animation: "shine 4.6s ease-in-out 1.2s infinite",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(58% 42% at 50% 44%, rgba(70,150,255,.38), transparent 72%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "54%",
                  background: "linear-gradient(180deg, rgba(165,208,255,.26), transparent)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: boltSpinning ? "boltSpin .6s cubic-bezier(.2,.7,.3,1)" : "none",
                }}
              >
                <i
                  className="ph-fill ph-lightning"
                  style={{
                    position: "absolute",
                    fontSize: 84,
                    color: "#04102a",
                    transform: "translate(3px,4px)",
                    opacity: 0.5,
                    filter: "blur(1px) saturate(1.5) brightness(1.2)",
                  }}
                />
                <i
                  className="ph-fill ph-lightning"
                  style={{
                    position: "absolute",
                    fontSize: 84,
                    color: "#f2f9ff",
                    transform: "translate(-2.5px,-2.5px)",
                    opacity: 0.92,
                    filter: "saturate(1.8) brightness(1.3)",
                  }}
                />
                <i
                  className="ph-fill ph-lightning"
                  style={{
                    position: "relative",
                    fontSize: 84,
                    background:
                      "linear-gradient(150deg,#eef7ff 0%,#a9d2ff 26%,#5c9df6 54%,#2f6ae0 78%,#163a92 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    animation: "boltPulse 3s ease-in-out infinite",
                    filter: "saturate(1.8) brightness(1.2)",
                  }}
                />
              </div>
            </Pressable>
          </div>
          <div style={{ position: "relative", display: "inline-block", marginTop: 30 }}>
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontWeight: 500,
                fontSize: 19,
                color: "#CBD5E1",
              }}
            >
              Tap to add an expense
            </div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              style={{ position: "absolute", right: -26, top: -8, pointerEvents: "none" }}
            >
              <path
                d="M25 27 C30 15, 18 5, 5 3"
                stroke="#94A3B8"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M11 7 L5 3 L12 1"
                stroke="#94A3B8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16, marginBottom: 24 }}>
        <Pressable
          onClick={onLogin}
          style={{
            width: "100%",
            height: 58,
            border: "1px solid rgba(148,163,184,.28)",
            borderRadius: 16,
            background: "rgba(148,163,184,.22)",
            color: "#F1F5F9",
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            transition: "transform .15s,background .2s",
          }}
          hoverStyle={{ background: "rgba(148,163,184,.3)" }}
          activeStyle={{ transform: "scale(.97)" }}
        >
          Log in
        </Pressable>
        <Pressable
          onClick={onSignup}
          style={{
            width: "100%",
            height: 58,
            border: "1px solid rgba(148,163,184,.28)",
            borderRadius: 16,
            background: "rgba(148,163,184,.22)",
            color: "#F1F5F9",
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            transition: "transform .15s,background .2s",
          }}
          hoverStyle={{ background: "rgba(148,163,184,.3)" }}
          activeStyle={{ transform: "scale(.97)" }}
        >
          Sign up
        </Pressable>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span
          onClick={onGuest}
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#3390FD",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          Continue as guest
          <svg width="16" height="16" viewBox="0 0 256 256" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M96 48L176 128L96 208"
              stroke="#3390FD"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
