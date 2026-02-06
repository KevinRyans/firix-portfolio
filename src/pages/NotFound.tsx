import { Link } from 'react-router-dom'
import { useProfile } from '../lib/i18n'
import { buttonStyles } from '../components/ui/buttonStyles'

export default function NotFound() {
  const profile = useProfile()
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-20 text-center">
      <h1 className="text-3xl font-semibold text-white">{profile.labels.notFoundTitle}</h1>
      <p className="mt-3 text-sm text-slate-400">{profile.labels.notFoundSubtitle}</p>
      <Link to="/" className={buttonStyles({ variant: 'secondary', className: 'mt-6' })}>
        {profile.labels.backHomeLabel}
      </Link>
    </div>
  )
}
