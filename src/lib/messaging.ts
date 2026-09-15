import { business } from '../content/site'

export type Channel = { id: string; label: string; href: string; hint: string }

/**
 * Meldingskanalene på samme nummer.
 *
 * Nummeret publiseres for melding, ikke for ringing, så det finnes bevisst
 * ingen `tel:`-lenke. Kanaler som er slått av i `business.messaging`
 * forsvinner helt.
 */
export function messagingChannels(): Channel[] {
  const number = business.mobile.replace(/\s/g, '')
  // WhatsApp og Telegram vil ha nummeret uten pluss.
  const bare = number.replace(/^\+/, '')

  const alle: Channel[] = number
    ? [
        {
          id: 'sms',
          label: 'SMS',
          href: `sms:${number}`,
          hint: business.mobileLabel,
        },
        {
          id: 'whatsapp',
          label: 'WhatsApp',
          href: `https://wa.me/${bare}`,
          hint: business.mobileLabel,
        },
        {
          id: 'telegram',
          label: 'Telegram',
          href: `https://t.me/${number}`,
          hint: business.mobileLabel,
        },
      ]
    : []

  if (business.discord) {
    alle.push({
      id: 'discord',
      label: 'Discord',
      href: business.discord,
      hint: business.discordHandle,
    })
  }

  return alle.filter((kanal) => business.messaging[kanal.id as keyof typeof business.messaging])
}
