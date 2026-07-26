"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (loading) return;
    if (!token) {
      setError("This reset link is missing its token.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 56,
    padding: "0 18px",
    borderRadius: 14,
    background: "#0C0E12",
    border: "1px solid rgba(241,245,249,.08)",
  } as const;

  const inputStyle = {
    flex: 1,
    minWidth: 0,
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "Instrument Sans, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    color: "#F1F5F9",
  } as const;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#050608",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(150deg,#3390FD,#2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="ph-fill ph-lightning" style={{ fontSize: 16, color: "#fff" }} />
          </div>
          <span style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 20, color: "#F1F5F9" }}>OneTap</span>
        </div>

        {done ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(25,230,128,.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <i className="ph-bold ph-check" style={{ fontSize: 30, color: "#19E680" }} />
            </div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 22, color: "#F1F5F9", marginBottom: 8 }}>
              Password updated
            </div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 15, color: "#94A3B8" }}>
              You can now sign in with your new password in the OneTap app.
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 24, color: "#F1F5F9", textAlign: "center", marginBottom: 6 }}>
              Set a new password
            </div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#94A3B8", textAlign: "center", marginBottom: 28 }}>
              Choose a new password for your account.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={inputRowStyle}>
                <i className="ph-duotone ph-lock-simple" style={{ fontSize: 20, color: "#3390FD" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  style={inputStyle}
                />
                <i
                  onClick={() => setShowPassword((v) => !v)}
                  className={`ph-duotone ${showPassword ? "ph-eye-slash" : "ph-eye"}`}
                  style={{ fontSize: 20, color: "#5B6578", cursor: "pointer" }}
                />
              </div>
              <div style={inputRowStyle}>
                <i className="ph-duotone ph-lock-simple" style={{ fontSize: 20, color: "#3390FD" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={inputStyle}
                />
              </div>
            </div>

            {error && (
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", padding: "10px 4px 0" }}>
                {error}
              </div>
            )}

            <button
              onClick={submit}
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
                marginTop: 22,
              }}
            >
              {loading ? "Saving…" : "Save new password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
