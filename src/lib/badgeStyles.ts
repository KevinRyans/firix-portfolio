export function getStatusTone(status?: string): 'default' | 'warning' | 'success' {
  if (!status) return 'default'
  const normalized = status.toLowerCase()
  if (normalized.includes('progress') || normalized.includes('pagar') || normalized.includes('pågår')) {
    return 'warning'
  }
  if (
    normalized.includes('complete') ||
    normalized.includes('done') ||
    normalized.includes('fullfort') ||
    normalized.includes('fullført') ||
    normalized.includes('ferdig')
  ) {
    return 'success'
  }
  return 'default'
}

export function getTagBadgeClass(_tag: string) {
  return ''
}
