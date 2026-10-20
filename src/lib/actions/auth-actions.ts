"use server";

import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth/auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

/**
 * Register a new user with email and hashed password
 */
export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterState> {
  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    return {
      error: "Please correct the form errors.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = result.data;
  const normalizedEmail = email.toLowerCase().trim();

  try {
    // Check for existing user
    const existing = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    if (existing) {
      return {
        error: "An account with this email address already exists.",
      };
    }

    // Hash password with bcrypt salt rounds 12
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user
    await db.insert(users).values({
      name: name.trim(),
      email: normalizedEmail,
      hashedPassword,
    });

    return { success: true };
  } catch (err) {
    console.error("User registration error:", err);
    return {
      error: "Failed to create account. Please try again later.",
    };
  }
}

/**
 * Get currently authenticated session user or null
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}

/**
 * Require authentication - throws error or returns authenticated user
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    throw new Error("Unauthorized: Please sign in to perform this action.");
  }
  return user;
}
