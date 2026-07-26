import { useRef, useState } from "react";
import { Pressable } from "../Pressable";

export function Profile({
  userName,
  userEmail,
  avatarUrl,
  canEditProfile,
  onAvatarChange,
  onNameChange,
  onEmailChange,
  totalBalanceText,
  savingsText,
  onOpenBalance,
  onOpenSettings,
  onLogout,
}: {
  userName: string;
  userEmail: string;
  avatarUrl: string | null;
  canEditProfile: boolean;
  onAvatarChange: (avatarUrl: string | null) => void;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  totalBalanceText: string;
  savingsText: string;
  onOpenBalance: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [nameSheetOpen, setNameSheetOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState(userName);
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");

  const openNameSheet = () => {
    setNameDraft(userName);
    setNameError("");
    setNameSheetOpen(true);
  };

  const saveName = async () => {
    const trimmed = nameDraft.trim();
    if (!trimmed || savingName) return;
    setNameError("");
    setSavingName(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNameError(data.error ?? "Couldn't update name.");
        return;
      }
      onNameChange(data.user.name);
      setNameSheetOpen(false);
    } catch {
      setNameError("Network error. Please try again.");
    } finally {
      setSavingName(false);
    }
  };

  const [emailSheetOpen, setEmailSheetOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState(userEmail);
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const openEmailSheet = () => {
    setEmailDraft(userEmail);
    setEmailError("");
    setEmailSheetOpen(true);
  };

  const saveEmail = async () => {
    const trimmed = emailDraft.trim();
    if (!trimmed || savingEmail) return;
    setEmailError("");
    setSavingEmail(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.error ?? "Couldn't update email.");
        return;
      }
      onEmailChange(data.user.email);
      setEmailSheetOpen(false);
    } catch {
      setEmailError("Network error. Please try again.");
    } finally {
      setSavingEmail(false);
    }
  };

  const [passwordSheetOpen, setPasswordSheetOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const openPasswordSheet = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordFields(false);
    setPasswordError("");
    setPasswordSheetOpen(true);
  };

  const savePassword = async () => {
    if (savingPassword) return;
    if (!currentPassword || !newPassword) {
      setPasswordError("Please fill in both fields.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match.");
      return;
    }
    setPasswordError("");
    setSavingPassword(true);
    try {
      const res = await fetch("/api/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error ?? "Couldn't update password.");
        return;
      }
      setPasswordSheetOpen(false);
    } catch {
      setPasswordError("Network error. Please try again.");
    } finally {
      setSavingPassword(false);
    }
  };

  const pickPhoto = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/avatar", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't upload photo.");
        return;
      }
      onAvatarChange(data.avatarUrl);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = async () => {
    setMenuOpen(false);
    setError("");
    setUploading(true);
    try {
      const res = await fetch("/api/avatar", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Couldn't remove photo.");
        return;
      }
      onAvatarChange(null);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="otscroll"
      style={{ position: "absolute", inset: 0, overflowY: "auto", animation: "screenIn .35s ease", paddingTop: 52 }}
    >
      <div style={{ padding: "64px 22px 118px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ position: "relative", width: 150, height: 150 }}>
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
                opacity: uploading ? 0.5 : 1,
                transition: "opacity .2s",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl ?? "/avatar-cropped.png"}
                alt=""
                style={{ width: "140%", height: "140%", objectFit: "cover", margin: "0 auto" }}
              />
            </div>
            {canEditProfile && (
              <Pressable
                onClick={() => setMenuOpen(true)}
                style={{
                  position: "absolute",
                  right: -2,
                  bottom: -2,
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "3px solid #050608",
                  background: "#3390FD",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 6px 16px -4px rgba(51,144,253,.7)",
                  transition: "transform .18s",
                }}
                hoverStyle={{ transform: "scale(1.06)" }}
                activeStyle={{ transform: "scale(.92)" }}
              >
                <i className="ph-bold ph-plus" style={{ fontSize: 18 }} />
              </Pressable>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            style={{ display: "none" }}
            onChange={handleFileSelected}
          />
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 24, color: "#F1F5F9", marginTop: 16, letterSpacing: "-.02em" }}>
            {userName}
          </div>
          {userEmail && (
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#94A3B8", marginTop: 3 }}>
              {userEmail}
            </div>
          )}
          {error && (
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", marginTop: 8 }}>
              {error}
            </div>
          )}
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

        <div
          style={{
            borderRadius: 16,
            padding: 6,
            background: "#0C0E12",
            border: "1px solid rgba(241,245,249,.06)",
            marginTop: 20,
            animation: "cardIn .5s ease .08s backwards",
          }}
        >
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: ".09em",
              color: "#5B6578",
              padding: "10px 12px 6px",
            }}
          >
            PROFILE INFORMATION
          </div>
          <Pressable
            onClick={openNameSheet}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "15px 16px",
              borderRadius: 12,
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
            }}
            hoverStyle={{ background: "#141821" }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(51,144,253,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="ph-duotone ph-user" style={{ fontSize: 22, color: "#3390FD" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 12, color: "#5B6578" }}>Name</div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {userName}
              </div>
            </div>
            <i className="ph-bold ph-pencil-simple" style={{ fontSize: 16, color: "#5B6578" }} />
          </Pressable>
          <div style={{ height: 1, background: "rgba(241,245,249,.06)", margin: "0 12px" }} />
          {canEditProfile ? (
            <Pressable
              onClick={openEmailSheet}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "15px 16px",
                borderRadius: 12,
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
              hoverStyle={{ background: "#141821" }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(148,163,184,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <i className="ph-duotone ph-envelope-simple" style={{ fontSize: 22, color: "#94A3B8" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 12, color: "#5B6578" }}>Email</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {userEmail || "—"}
                </div>
              </div>
              <i className="ph-bold ph-pencil-simple" style={{ fontSize: 16, color: "#5B6578" }} />
            </Pressable>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 16px" }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(148,163,184,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <i className="ph-duotone ph-envelope-simple" style={{ fontSize: 22, color: "#94A3B8" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 12, color: "#5B6578" }}>Email</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {userEmail || "—"}
                </div>
              </div>
            </div>
          )}
          {canEditProfile && (
            <>
              <div style={{ height: 1, background: "rgba(241,245,249,.06)", margin: "0 12px" }} />
              <Pressable
                onClick={openPasswordSheet}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "15px 16px",
                  borderRadius: 12,
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
                hoverStyle={{ background: "#141821" }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(51,144,253,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className="ph-duotone ph-lock-simple" style={{ fontSize: 22, color: "#3390FD" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 500, fontSize: 12, color: "#5B6578" }}>Password</div>
                  <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9", marginTop: 1 }}>
                    ••••••••
                  </div>
                </div>
                <i className="ph-bold ph-pencil-simple" style={{ fontSize: 16, color: "#5B6578" }} />
              </Pressable>
            </>
          )}
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

      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
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
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 17, color: "#F1F5F9", textAlign: "center", marginBottom: 18 }}>
              Profile photo
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <Pressable
                onClick={pickPhoto}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "15px 16px",
                  borderRadius: 14,
                  background: "#0C0E12",
                  border: "1px solid rgba(241,245,249,.06)",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
                hoverStyle={{ background: "#141821" }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(51,144,253,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ph-duotone ph-image" style={{ fontSize: 22, color: "#3390FD" }} />
                </div>
                <span style={{ flex: 1, fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>
                  Choose photo
                </span>
              </Pressable>
              {avatarUrl && (
                <Pressable
                  onClick={removePhoto}
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
                  }}
                  hoverStyle={{ background: "rgba(248,113,113,.06)" }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(248,113,113,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="ph-duotone ph-trash" style={{ fontSize: 22, color: "#F87171" }} />
                  </div>
                  <span style={{ flex: 1, fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 15, color: "#F87171" }}>
                    Remove photo
                  </span>
                </Pressable>
              )}
            </div>
          </div>
        </>
      )}

      {nameSheetOpen && (
        <>
          <div
            onClick={() => setNameSheetOpen(false)}
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
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 17, color: "#F1F5F9", textAlign: "center", marginBottom: 18 }}>
              Edit name
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
              <i className="ph-duotone ph-user" style={{ fontSize: 20, color: "#3390FD" }} />
              <input
                type="text"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                placeholder="Your name"
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
            {nameError && (
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", padding: "0 4px 10px" }}>
                {nameError}
              </div>
            )}
            <Pressable
              onClick={saveName}
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
              {savingName ? "Saving…" : "Save"}
            </Pressable>
          </div>
        </>
      )}

      {emailSheetOpen && (
        <>
          <div
            onClick={() => setEmailSheetOpen(false)}
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
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 17, color: "#F1F5F9", textAlign: "center", marginBottom: 18 }}>
              Edit email
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
                value={emailDraft}
                onChange={(e) => setEmailDraft(e.target.value)}
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
            {emailError && (
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", padding: "0 4px 10px" }}>
                {emailError}
              </div>
            )}
            <Pressable
              onClick={saveEmail}
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
              {savingEmail ? "Saving…" : "Save"}
            </Pressable>
          </div>
        </>
      )}

      {passwordSheetOpen && (
        <>
          <div
            onClick={() => setPasswordSheetOpen(false)}
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
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 700, fontSize: 17, color: "#F1F5F9", textAlign: "center", marginBottom: 18 }}>
              Change password
            </div>

            {[
              { label: "Current password", value: currentPassword, onChange: setCurrentPassword },
              { label: "New password", value: newPassword, onChange: setNewPassword },
              { label: "Confirm new password", value: confirmPassword, onChange: setConfirmPassword },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 12, color: "#94A3B8", paddingLeft: 4 }}>
                  {f.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    height: 52,
                    padding: "0 16px",
                    borderRadius: 14,
                    background: "#0C0E12",
                    border: "1px solid rgba(241,245,249,.08)",
                  }}
                >
                  <i className="ph-duotone ph-lock-simple" style={{ fontSize: 18, color: "#3390FD" }} />
                  <input
                    type={showPasswordFields ? "text" : "password"}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: "Instrument Sans, sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#F1F5F9",
                    }}
                  />
                  {i === 0 && (
                    <i
                      onClick={() => setShowPasswordFields((v) => !v)}
                      className={`ph-duotone ${showPasswordFields ? "ph-eye-slash" : "ph-eye"}`}
                      style={{ fontSize: 18, color: "#5B6578", cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
            ))}

            {passwordError && (
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600, fontSize: 13, color: "#F87171", padding: "0 4px 10px" }}>
                {passwordError}
              </div>
            )}

            <Pressable
              onClick={savePassword}
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
              {savingPassword ? "Saving…" : "Save"}
            </Pressable>
          </div>
        </>
      )}
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
