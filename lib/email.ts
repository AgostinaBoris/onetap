import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const resend = getResend();
  await resend.emails.send({
    from: "OneTap <onboarding@resend.dev>",
    to,
    subject: "Reset your OneTap password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#0C0E12;">Reset your password</h2>
        <p style="color:#333;">We received a request to reset your OneTap password. Click the button below to choose a new one. This link expires in 1 hour.</p>
        <p style="margin: 24px 0;">
          <a href="${resetUrl}" style="background:#3390FD;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
            Reset password
          </a>
        </p>
        <p style="color:#888;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
