import { NextResponse } from "next/server";

/* ============================================================================
   Enquiry intake.
   ----------------------------------------------------------------------------
   No email provider is wired up yet — deliberately. Rather than pretend to
   send mail and silently drop enquiries, this route:

     1. validates the payload,
     2. logs it server-side so nothing is lost,
     3. forwards it to MGM_WEBHOOK_URL if that env var is set
        (a Zapier / Make / n8n hook, or a Google Apps Script endpoint),
     4. returns ok, and the client then offers a pre-filled WhatsApp handoff.

   To turn on email: set MGM_WEBHOOK_URL, or drop a provider call in below.
   ============================================================================ */

export interface EnquiryLine {
  product: string;
  size: string;
  micron: string;
  quantity: string;
  note?: string;
}

export interface EnquiryPayload {
  kind: "quote" | "sample" | "contact";
  name: string;
  company?: string;
  phone: string;
  email?: string;
  city?: string;
  industry?: string;
  message?: string;
  lines?: EnquiryLine[];
}

function bad(msg: string) {
  return NextResponse.json({ ok: false, error: msg }, { status: 400 });
}

export async function POST(req: Request) {
  let body: EnquiryPayload;
  try {
    body = await req.json();
  } catch {
    return bad("We couldn't read that submission. Please try again.");
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (name.length < 2) return bad("Please tell us your name.");

  // Indian mobile numbers, with or without +91 / 0 / spaces
  const digits = phone.replace(/[^\d]/g, "");
  const localTen = digits.length > 10 ? digits.slice(-10) : digits;
  if (!/^[6-9]\d{9}$/.test(localTen)) {
    return bad("Please enter a valid 10-digit mobile number so we can call you back.");
  }

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email.trim())) {
    return bad("That email address doesn't look right.");
  }

  const record = {
    ...body,
    name,
    phone: localTen,
    receivedAt: new Date().toISOString(),
  };

  // 2 — never lose it
  console.info("[MGM enquiry]", JSON.stringify(record, null, 2));

  // 3 — forward if a hook is configured
  const hook = process.env.MGM_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      // the enquiry is already logged; don't fail the visitor's submission
      console.error("[MGM enquiry] webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true, forwarded: Boolean(hook) });
}
