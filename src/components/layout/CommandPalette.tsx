import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Command, Search } from 'lucide-react'
import { useProjects } from '../../lib/projects'
import { useProfile } from '../../lib/i18n'
import { cn } from '../../lib/utils'

type CommandItem = {
  id: string
  label: string
  group: string
  onSelect: () => void
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const profile = useProfile()
  const { projects } = useProjects(profile)

  const commands = useMemo<CommandItem[]>(() => {
    const navItems = profile.navigation.map((item) => ({
      id: item.to,
      label: item.label,
      group: profile.labels.navigationGroup,
      onSelect: () => navigate(item.to),
    }))

    const projectItems = projects.slice(0, 8).map((project) => ({
      id: project.slug,
      label: project.displayName,
      group: profile.labels.projectsGroup,
      onSelect: () => navigate(`/projects/${project.slug}`),
    }))

    const contactItems = profile.contact.links.map((link) => ({
      id: link.href,
      label: link.label,
      group: profile.labels.contactGroup,
      onSelect: () => window.open(link.href, '_blank'),
    }))

    return [...navItems, ...projectItems, ...contactItems]
  }, [navigate, projects])

  const filtered = useMemo(() => {
    if (!query.trim()) return commands
    const term = query.toLowerCase()
    return commands.filter((command) => command.label.toLowerCase().includes(term))
  }, [commands, query])

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
      acc[item.group] = acc[item.group] ? [...acc[item.group], item] : [item]
      return acc
    }, {})
  }, [filtered])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isCmdK) {
        event.preventDefault()
        setOpen((prev) => {
          const next = !prev
          if (!next) setQuery('')
          return next
        })
      }
      if (event.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closePalette = () => {
    setOpen(false)
    setQuery('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="no-print focus-ring fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 shadow-soft transition hover:border-white/20 hover:text-white md:flex"
      >
        <Command size={14} />
        {profile.labels.commandHint}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="no-print fixed inset-0 z-50 flex items-center justify-center bg-base-950/80 px-4 py-10 backdrop-blur"
            onClick={closePalette}
          >
            <motion.div
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-base-950/90 p-4 shadow-glow"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                  autoFocus
                  placeholder={profile.labels.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-100 outline-none"
                />
              </div>
              <div className="mt-4 max-h-80 space-y-4 overflow-y-auto pr-2">
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {group}
                    </p>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={cn(
                            'focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10',
                          )}
                          onClick={() => {
                            item.onSelect()
                            closePalette()
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {filtered.length === 0 ? (
                  <p className="text-sm text-slate-400">{profile.labels.noCommandResults}</p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
