import { NextResponse } from "next/server";
import { and, eq, ne } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getSessionUser } from "@/lib/session";

export async function PATCH(req: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const hasName = typeof body?.name === "string";
  const hasEmail = typeof body?.email === "string";
  if (!hasName && !hasEmail) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const db = getDb();
  const updates: { name?: string; email?: string } = {};

  if (hasName) {
    const name = body.name.trim();
    if (!name) {
      return NextResponse.json({ error: "Name can't be empty." }, { status: 400 });
    }
    updates.name = name;
  }

  if (hasEmail) {
    const email = body.email.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.email, email), ne(users.id, sessionUser.id)))
      .limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    updates.email = email;
  }

  const [user] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, sessionUser.id))
    .returning({ id: users.id, name: users.name, email: users.email, avatarUrl: users.avatarUrl });

  return NextResponse.json({ user });
}
