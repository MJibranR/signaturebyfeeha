// lib/actions/contact.ts
"use server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { sendReplyEmail } from "./email";


export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  reply: string | null;
  repliedAt: Date | null;
  status: "pending" | "replied";
  createdAt: Date | null;
};

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const [message] = await db
      .insert(contactMessages)
      .values({
        name: data.name,
        email: data.email,
        message: data.message,
        status: "pending",
      })
      .returning();
    
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Failed to send message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function getContactMessages() {
  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
    
    return messages as ContactMessage[];
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

// lib/actions/contact.ts
export async function replyToMessage(id: number, reply: string) {
  try {
    // First, get the message to get email and name
    const [message] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id));

    if (!message) {
      return { success: false, error: "Message not found" };
    }

    // Update the message with reply
    await db
      .update(contactMessages)
      .set({
        reply: reply,
        status: "replied",
        repliedAt: new Date(),
      })
      .where(eq(contactMessages.id, id));

    // Send email to customer
    try {
      const emailResult = await sendReplyEmail(
        message.email,
        message.name,
        reply,
        message.message
      );

      if (!emailResult.success) {
        console.error("Email failed:", emailResult.error);
        return { 
          success: true, 
          emailSent: false, 
          error: "Reply saved but email failed: " + emailResult.error 
        };
      }

      return { success: true, emailSent: true };
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return { 
        success: true, 
        emailSent: false, 
        error: "Reply saved but email failed to send. Please check email configuration." 
      };
    }
  } catch (error) {
    console.error("Failed to send reply:", error);
    return { success: false, error: "Failed to send reply: " + error };
  }
}

export async function deleteContactMessage(id: number) {
  try {
    await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id));
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: "Failed to delete message" };
  }
}

