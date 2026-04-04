import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // Strict validation
    if (!type || !data) {
      return NextResponse.json({ success: true, message: "Invalid payload, skipped." });
    }

    // Structured JSON Logging (Production Standard)
    if (type === "new_order") {
      console.log("🔔 NEW ORDER RECEIVED:", JSON.stringify(data, null, 2));
    } else if (type === "status_update") {
      console.log("📝 STATUS UPDATE NOTIFICATION:", JSON.stringify(data, null, 2));
    }

    // Future hook: Email/Resend/WhatsApp can be plugged here
    // e.g., if (type === 'new_order') await sendEmail(...)

    return NextResponse.json({ success: true });
  } catch (error) {
    // Requirements: Safe silence and always return { success: true }
    console.error("Internal Notification Error:", error);
    return NextResponse.json({ success: true });
  }
}
