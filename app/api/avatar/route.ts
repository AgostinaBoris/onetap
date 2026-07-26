import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { put, del } from "@vercel/blob";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getSessionUser } from "@/lib/session";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Please upload a JPEG, PNG, WebP or GIF image." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Image must be smaller than 5MB." }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db.select({ avatarUrl: users.avatarUrl }).from(users).where(eq(users.id, sessionUser.id)).limit(1);

  const blob = await put(`avatars/${sessionUser.id}-${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await db.update(users).set({ avatarUrl: blob.url }).where(eq(users.id, sessionUser.id));

  if (existing?.avatarUrl) {
    await del(existing.avatarUrl).catch(() => {});
  }

  return NextResponse.json({ avatarUrl: blob.url });
}

export async function DELETE() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const db = getDb();
  const [existing] = await db.select({ avatarUrl: users.avatarUrl }).from(users).where(eq(users.id, sessionUser.id)).limit(1);

  await db.update(users).set({ avatarUrl: null }).where(eq(users.id, sessionUser.id));

  if (existing?.avatarUrl) {
    await del(existing.avatarUrl).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
