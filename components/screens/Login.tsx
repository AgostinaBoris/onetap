import { useState } from "react";
import { BackButton } from "../BackButton";
import { CTAButton } from "../CTAButton";
import { Pressable } from "../Pressable";
import type { SessionUser } from "@/lib/types";

export function Login({
  onBack,
  onSignIn,
}: {
  onBack: () => void;
  onSignIn: (user: SessionUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

  const submit = async () => {
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      onSignIn(data.user);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openForgot = () => {
    setForgotEmail(email);
    setForgotSent(false);
    setForgotError("");
    setForgotOpen(true);
  };

  const submitForgot = async () => {
    if (forgotLoading) return;
    const trimmed = forgotEmail.trim();
    if (!trimmed) {
      setForgotError("Please enter your email.");
      return;
    }
    setForgotError("");
    setForgotLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setForgotError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setForgotSent(true);
    } catch {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
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
            <i
              onClick={() => setShowPassword((v) => !v)}
              className={`ph-duotone ${showPassword ? "ph-eye-slash" : "ph-eye"}`}
              style={{ fontSize: 20, color: "#5B6578", marginLeft: "auto", cursor: "pointer" }}
            />
          </div>
        </div>
        {error && (
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", paddingLeft: 4 }}>
            {error}
          </div>
        )}
        <div
          onClick={openForgot}
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: "#3390FD",
            textAlign: "right",
            padding: "2px 4px",
            cursor: "pointer",
          }}
        >
          Forgot your password?
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <CTAButton onClick={submit}>{loading ? "Signing in…" : "Sign in"}</CTAButton>

      {forgotOpen && (
        <>
          <div
            onClick={() => setForgotOpen(false)}
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

            {forgotSent ? (
              <>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(25,230,128,.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <i className="ph-bold ph-envelope-simple-open" style={{ fontSize: 26, color: "#19E680" }} />
                </div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 17, color: "#F1F5F9", textAlign: "center", marginBottom: 8 }}>
                  Check your email
                </div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#94A3B8", textAlign: "center", marginBottom: 20 }}>
                  If an account exists for {forgotEmail}, we've sent a link to reset your password.
                </div>
                <Pressable
                  onClick={() => setForgotOpen(false)}
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
                >
                  Done
                </Pressable>
              </>
            ) : (
              <>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 17, color: "#F1F5F9", textAlign: "center", marginBottom: 6 }}>
                  Reset your password
                </div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#94A3B8", textAlign: "center", marginBottom: 18 }}>
                  We'll email you a link to reset it.
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
                    marginBottom: 10,
                  }}
                >
                  <i className="ph-duotone ph-envelope-simple" style={{ fontSize: 20, color: "#3390FD" }} />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoFocus
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
                {forgotError && (
                  <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", padding: "0 4px 10px" }}>
                    {forgotError}
                  </div>
                )}
                <Pressable
                  onClick={submitForgot}
                  style={{
                    width: "100%",
                    height: 56,
                    border: "none",
                    borderRadius: 16,
                    fontFamily: "Instrument Sans, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    color: "#fff",
                    background: "linear-gradient(150deg,#3390FD,#2563EB)",
                    boxShadow: "0 14px 30px -8px rgba(37,99,235,.5)",
                    marginTop: 6,
                  }}
                  hoverStyle={{ filter: "brightness(1.1)" }}
                  activeStyle={{ transform: "scale(.985)" }}
                >
                  {forgotLoading ? "Sending…" : "Send reset link"}
                </Pressable>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
