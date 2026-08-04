import { NextResponse } from 'next/server'
import { createContactQuery } from '@/lib/cms'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>
    const name = String(body.name ?? '').trim().slice(0, 100)
    const email = String(body.email ?? '').trim().slice(0, 255)
    const phone = String(body.phone ?? '').trim().slice(0, 20)
    const message = String(body.message ?? '').trim().slice(0, 1000)

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Please fill in your name, email and message.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
    }

    await createContactQuery({ name, email, phone, message })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] failed', err)
    return NextResponse.json({ ok: false, error: 'Could not send your message. Please try WhatsApp instead.' }, { status: 500 })
  }
}
