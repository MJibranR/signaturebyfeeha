// lib/actions/auth.ts
"use server";

import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/schema";
import { eq, and, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "./email";
import crypto from "crypto";

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (existing.length > 0) return { error: "User already exists" };

    const hashed = await bcrypt.hash(data.password, 10);

    await db.insert(users).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashed,
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register user" };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const user = result[0];
    if (!user) return { error: "User not found" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Invalid password" };

    const createdAt = user.created_at ? user.created_at.toISOString() : null;

    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone ?? "",
        createdAt,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Failed to login" };
  }
}

export async function requestPasswordReset(email: string) {
  try {
    // Check if user exists
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      // Don't reveal that user doesn't exist for security
      return { success: true, message: "If an account exists, you'll receive a reset email." };
    }

    // Delete any existing reset tokens for this email
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.email, email));

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    // Store token in database
    await db.insert(passwordResetTokens).values({
      email: email,
      token: token,
      expiresAt: expiresAt,
    });

    // Send reset email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/account/reset-password?token=${token}`;
    
    const emailSent = await sendPasswordResetEmail(email, user.firstName, resetLink);

    if (!emailSent) {
      console.error("Failed to send reset email");
      return { success: false, error: "Failed to send reset email. Please try again." };
    }

    return { success: true, message: "Password reset email sent!" };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { success: false, error: "An error occurred. Please try again." };
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Find the token in database
    const [tokenRecord] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    if (!tokenRecord) {
      return { success: false, error: "Invalid or expired reset token." };
    }
    
    // Check if token is expired
    if (tokenRecord.expiresAt < new Date()) {
      // Delete expired token
      await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));
      return { success: false, error: "Reset token has expired. Please request a new one." };
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user's password
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, tokenRecord.email));
    
    // Delete the used token
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));
    
    return { success: true, message: "Password has been reset successfully!" };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: "Failed to reset password. Please try again." };
  }
}

export async function updateUser(
  id: number,
  data: { firstName: string; lastName: string; email: string; phone: string }
) {
  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (existing.length > 0 && existing[0].id !== id) {
      return { error: "Email already in use by another account" };
    }

    await db
      .update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      })
      .where(eq(users.id, id));

    return { success: true };
  } catch (error) {
    console.error("Update user error:", error);
    return { error: "Failed to update user" };
  }
}

export async function getUserById(id: number) {
  try {
    const result = await db.select().from(users).where(eq(users.id, id));
    const user = result[0];
    if (!user) return null;
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      createdAt: user.created_at ? user.created_at.toISOString() : null,
    };
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}