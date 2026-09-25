import { X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { getProfileFieldLabel, formatProfileValue } from '../utils/profileParser'

const FIELD_ORDER = ['age', 'gender', 'state', 'city', 'income', 'occupation', 'education', 'category', 'disability', 'interests']

export default function ProfileChips({ profile, onRemove, onEdit }) {
  const { t } = useLang()

  if (!profile) return null

  const chips = FIELD_ORDER
    .map(key => {
      const value = formatProfileValue(key, profile[key])
      return { key, label: getProfileFieldLabel(key, t), value }
    })
    .filter(c => c.value)

  const missing = FIELD_ORDER
    .filter(key => {
      const v = profile[key]
      return !v || (Array.isArray(v) && v.length === 0)
    })
    .map(key => ({ key, label: getProfileFieldLabel(key, t) }))
    .slice(0, 3) // Show max 3 missing fields

  return (
    <div className="space-y-4">
      {/* Extracted chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map(({ key, label, value }) => (
          <div
            key={key}
            className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-sm font-medium px-3 py-1.5 rounded"
          >
            <span className="text-xs text-blue-500 font-normal">{label}:</span>
            <span>{value}</span>
            {onRemove && (
              <button
                onClick={() => onRemove(key)}
                className="ml-0.5 text-blue-400 hover:text-blue-700 transition-colors"
                aria-label={`Remove ${label}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Missing fields (show as grayed out) */}
      {missing.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-400">{t.notProvided}:</span>
          {missing.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onEdit && onEdit(key)}
              className="inline-flex items-center gap-1 border border-dashed border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400 text-xs px-2.5 py-1 rounded transition-colors"
            >
              + {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
