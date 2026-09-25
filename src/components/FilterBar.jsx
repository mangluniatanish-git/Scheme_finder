import { useLang } from '../context/LanguageContext'

export default function FilterBar({ activeType, onTypeChange, activeCategory, onCategoryChange, categories = [] }) {
  const { t, lang } = useLang()

  const typeFilters = [
    { id: 'all', label: t.all },
    { id: 'central', label: t.centralGovt },
    { id: 'state', label: t.stateGovt },
  ]

  return (
    <div className="space-y-3">
      {/* Type filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {typeFilters.map(f => (
          <button
            key={f.id}
            onClick={() => onTypeChange(f.id)}
            className={`text-sm font-medium px-4 py-2 rounded border transition-colors ${
              activeType === f.id
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onCategoryChange(null)}
            className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
              !activeCategory
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {t.all}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id === activeCategory ? null : cat.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {lang === 'hi' ? cat.labelHi : cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
