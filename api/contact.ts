import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message } = req.body as {
    name?: string
    email?: string
    phone?: string
    message?: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    const ownerHtml =
      '<h2 style="font-family:monospace;color:#7fffb2">New message from ' + name + '</h2>' +
      '<p><strong>Name:</strong> ' + name + '</p>' +
      '<p><strong>Email:</strong> ' + email + '</p>' +
      (phone ? '<p><strong>Phone:</strong> ' + phone + '</p>' : '') +
      '<p><strong>Message:</strong></p>' +
      '<p>' + message.replace(/
/g, '<br>') + '</p>'

    const visitorHtml =
      '<h2 style="font-family:monospace">Hey ' + name + ', got your message!</h2>' +
      '<p>Thanks for reaching out. I’ll get back to you as soon as possible.</p>' +
      '<hr>' +
      '<p style="color:#666">Your message:</p>' +
      '<blockquote style="border-left:3px solid #7fffb2;padding-left:1em;color:#444">' +
      '<p>' + message.replace(/
/g, '<br>') + '</p>' +
      '</blockquote>' +
      '<p style="font-size:0.85em;color:#888">— Michael @ FIRIX.NO</p>'

    await resend.emails.send({
      from: 'Portfolio <noreply@firix.no>',
      to: 'michael@firix.no',
      subject: 'New message from ' + name,
      html: ownerHtml,
    })

    await resend.emails.send({
      from: 'Michael @ FIRIX.NO <noreply@firix.no>',
      to: email,
      subject: 'Got your message — FIRIX.NO',
      html: visitorHtml,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}
