import { useState } from "react";
import { BackButton } from "../BackButton";
import { CTAButton } from "../CTAButton";
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
      <CTAButton onClick={submit}>{loading ? "Signing in…" : "Sign in"}</CTAButton>
    </div>
  );
}
