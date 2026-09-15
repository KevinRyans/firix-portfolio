import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/**
 * macOS-aktig nettleservindu. Rammen gjør at en preview leses som «et ekte
 * nettsted» i stedet for «et bilde på en side» — samme grep Apple bruker når
 * de viser programvare i marketing.
 */
export default function BrowserFrame({
  host,
  children,
  className,
  compact = false,
}: {
  host: string
  children: ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-card border border-hairline bg-elevated shadow-chrome',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 border-b border-hairline bg-elevated px-3',
          compact ? 'h-8' : 'h-10 sm:px-4',
        )}
      >
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[60%] items-center gap-1.5 rounded-md bg-ground px-2.5 py-1">
          <svg
            viewBox="0 0 12 12"
            className="h-2.5 w-2.5 shrink-0 text-fg-faint"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M6 1a2.5 2.5 0 0 0-2.5 2.5V5H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-.5V3.5A2.5 2.5 0 0 0 6 1Zm1.5 4h-3V3.5a1.5 1.5 0 0 1 3 0V5Z"
            />
          </svg>
          <span className="truncate text-[11px] font-medium text-fg-faint">{host}</span>
        </div>
        <div className="w-[38px] shrink-0" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
