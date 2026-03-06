const VISITOR_KEY = 'firix_vid'

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36)
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return 'unknown'
  }
}

export function trackPageView(path: string): void {
  const visitorId = getVisitorId()
  const referrer = document.referrer || ''
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, visitorId, referrer }),
    keepalive: true,
  }).catch(() => { /* analytics failures are silent */ })
}
