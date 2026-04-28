import { NextRequest, NextResponse } from "next/server";

// ─── Email sending via Resend ─────────────────────────────────────────────────
// 1. Sign up at https://resend.com (free — 100 emails/day)
// 2. Create an API key in the Resend dashboard
// 3. Add it to your .env.local file:
//      RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
// 4. Replace TO_EMAIL below with your real email address
// ─────────────────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// ── Replace with your real destination email ──────────────────────────────────
const TO_EMAIL = "jebrilaabed@gmail.com";

// ── While testing without a verified domain, Resend allows sending only FROM
//    this address. Once you verify your domain, change it to e.g. no-reply@yourdomain.com
const FROM_EMAIL = "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // ── Basic server-side validation ─────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 },
      );
    }

    // ── Send email via Resend REST API ────────────────────────────────────────
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: email, // replying in your inbox goes back to the sender
        subject: `New message from ${name} — Jebril Aabed Portfolio`,
        html: `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 2rem; background: #fff;">
            <div style="border-bottom: 3px solid #6B21E8; padding-bottom: 1rem; margin-bottom: 1.5rem;">
              <h2 style="margin: 0; font-size: 1.5rem; color: #0a0a0a;">New Contact Form Submission</h2>
              <p style="margin: 0.25rem 0 0; color: #6b7280; font-size: 0.9rem;">via Jebril Aabed Portfolio</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
              <tr>
                <td style="padding: 0.6rem 0; color: #9ca3af; font-size: 0.85rem; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 0.6rem 0; font-weight: 600; color: #0a0a0a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 0.6rem 0; color: #9ca3af; font-size: 0.85rem; vertical-align: top;">Email</td>
                <td style="padding: 0.6rem 0; font-weight: 600; color: #6B21E8;">
                  <a href="mailto:${email}" style="color: #6B21E8;">${email}</a>
                </td>
              </tr>
            </table>

            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.25rem;">
              <p style="margin: 0 0 0.5rem; color: #9ca3af; font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin: 0; color: #374151; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="margin-top: 2rem; font-size: 0.78rem; color: #9ca3af; text-align: center;">
              Sent from jebrilaabed.com · Reply to this email to respond directly to ${name}
            </p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
