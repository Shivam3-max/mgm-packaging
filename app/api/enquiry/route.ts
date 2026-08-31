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

const WEBHOOK = process.env.MGM_WEBHOOK_URL;

if (!WEBHOOK) {
  console.warn(
    "\n[MGM enquiry] ⚠  MGM_WEBHOOK_URL is not set — enquiries will be written to\n" +
      "             this log only and nobody will be notified. Set it before\n" +
      "             launch (see .env.example).\n"
  );
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
  let delivered = false;
  if (WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8000),
      });
      delivered = res.ok;
      if (!res.ok) {
        console.error(
          `[MGM enquiry] ⚠  webhook responded ${res.status} — enquiry from ` +
            `${record.name} (${record.phone}) is in this log only.`
        );
      }
    } catch (err) {
      // the enquiry is already logged; don't fail the visitor's submission
      console.error(
        `[MGM enquiry] ⚠  webhook call failed — enquiry from ${record.name} ` +
          `(${record.phone}) is in this log only.`,
        err
      );
    }
  } else {
    console.error(
      `[MGM enquiry] ⚠  no MGM_WEBHOOK_URL — enquiry from ${record.name} ` +
        `(${record.phone}) is in this log only and nobody was notified.`
    );
  }

  return NextResponse.json({ ok: true, delivered });
}
