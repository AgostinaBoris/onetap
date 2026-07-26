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
                background: "radial-gradient(circle, rgba(51,144,253,.16), transparent 70%)",
                filter: "blur(22px)",
                animation: "glowBreath 4s ease-in-out infinite",
              }}
            />
            <Pressable
              as="div"
              onClick={onSpinBolt}
              style={{
                position: "relative",
                width: 248,
                height: 248,
                borderRadius: 30,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(125% 120% at 50% 16%, #0f2a52 0%, #081833 46%, #04091a 100%)",
                border: "2px solid rgba(90,170,255,.8)",
                animation: "borderGlow 4s ease-in-out infinite",
                cursor: "pointer",
              }}
              activeStyle={{ transform: "scale(.96)" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  boxShadow: "inset 0 18px 36px rgba(0,4,14,.65), inset 0 -30px 46px rgba(0,4,14,.8), inset 0 0 40px rgba(0,4,14,.4)",
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
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(90,170,255,.3), transparent 68%)",
                    filter: "blur(9px)",
                    pointerEvents: "none",
                  }}
                />
                <svg
                  width={172}
                  height={172}
                  viewBox="0 0 24 24"
                  style={{
                    position: "relative",
                    animation: "boltPulse 3s ease-in-out infinite",
                    filter: "drop-shadow(0 6px 10px rgba(3,10,28,.7))",
                  }}
                >
                  <defs>
                    <linearGradient id="boltGrad" x1="20%" y1="0%" x2="78%" y2="100%">
                      <stop offset="0%" stopColor="#eaf5ff" />
                      <stop offset="24%" stopColor="#a4cffc" />
                      <stop offset="52%" stopColor="#4d9bfb" />
                      <stop offset="78%" stopColor="#1e5fd0" />
                      <stop offset="100%" stopColor="#123f9e" />
                    </linearGradient>
                    <linearGradient id="boltStroke" x1="10%" y1="0%" x2="90%" y2="100%">
                      <stop offset="0%" stopColor="#f4f9ff" />
                      <stop offset="45%" stopColor="#bfe0ff" />
                      <stop offset="100%" stopColor="#5c9df6" />
                    </linearGradient>
                    <filter id="boltBevel" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="0.4" result="blur" />
                      <feSpecularLighting
                        in="blur"
                        surfaceScale={2}
                        specularConstant={0.9}
                        specularExponent={16}
                        lightingColor="#eef6ff"
                        result="spec"
                      >
                        <fePointLight x="-25" y="-35" z="45" />
                      </feSpecularLighting>
                      <feComposite in="spec" in2="SourceAlpha" operator="in" result="specClip" />
                      <feComposite
                        in="SourceGraphic"
                        in2="specClip"
                        operator="arithmetic"
                        k1={0}
                        k2={1}
                        k3={1}
                        k4={0}
                        result="lit"
                      />
                      <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="shadowBlur" />
                      <feOffset in="shadowBlur" dx="1.1" dy="1.4" result="shadowOffset" />
                      <feComposite in="shadowOffset" in2="SourceAlpha" operator="in" result="innerShadow" />
                      <feFlood floodColor="#02081c" floodOpacity={0.55} result="shadowColor" />
                      <feComposite in="shadowColor" in2="innerShadow" operator="in" result="shadowFinal" />
                      <feMerge>
                        <feMergeNode in="lit" />
                        <feMergeNode in="shadowFinal" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    fill="url(#boltGrad)"
                    stroke="url(#boltStroke)"
                    strokeWidth={0.6}
                    strokeLinejoin="miter"
                    filter="url(#boltBevel)"
                  />
                </svg>
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
