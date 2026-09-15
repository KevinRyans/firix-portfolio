import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 45000 -> «45 000». Norsk tusenskille er hardt mellomrom. */
export function formatPrice(value: number) {
  return new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(value)
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/** Vertsnavn uten «www.» — brukes i nettleser-chromen over previews. */
export function prettyHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
