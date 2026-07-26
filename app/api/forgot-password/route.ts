import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { passwordResetTokens, users } from "@/lib/db/schema";
import { sendPasswordResetEmail } from "@/lib/email";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return NextResponse.json({ error: "Please enter your email." }, { status: 400 });
  }

  const db = getDb();
  const rows = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  const user = rows[0];

  if (user) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);
    await db.insert(passwordResetTokens).values({ token, userId: user.id, expiresAt });

    const origin = req.headers.get("origin") ?? `https://${req.headers.get("host")}`;
    const resetUrl = `${origin}/reset-password?token=${token}`;

    await sendPasswordResetEmail(email, resetUrl).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
