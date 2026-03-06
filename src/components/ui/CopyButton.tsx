import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function CopyButton({
  value,
  label,
  copiedLabel,
}: {
  value: string
  label: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'focus-ring inline-flex items-center gap-1.5 rounded-[4px] border border-[#1c1c28] bg-transparent px-[0.6rem] py-[0.2rem] font-mono text-[0.65rem] text-slate-500 transition hover:border-accent-400 hover:text-accent-400',
        copied && 'border-accent-400/40 text-accent-400',
      )}
    >
      {copied ? <Check size={11} /> : null}
      {copied ? copiedLabel : label}
    </button>
  )
}
