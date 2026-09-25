import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useProfile } from '../context/ProfileContext'
import { matchSchemes } from '../utils/schemeMatcher'
import { CATEGORIES } from '../data/schemes'
import SchemeCard from '../components/SchemeCard'
import FilterBar from '../components/FilterBar'

function buildProfileSummary(profile) {
  if (!profile) return null
  const parts = []
  if (profile.age) parts.push(`Age ${profile.age}`)
  if (profile.occupation) parts.push(profile.occupation.charAt(0).toUpperCase() + profile.occupation.slice(1))
  if (profile.state) parts.push(profile.state)
  if (profile.category) parts.push(profile.category)
  if (profile.income) parts.push(profile.income)
  return parts.join(' · ')
}

export default function Results() {
  const { t, lang } = useLang()
  const { profile, clearProfile } = useProfile()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeType, setActiveType] = useState('all')
  const [activeCategory, setActiveCategory] = useState(null)
  const [visibleCount, setVisibleCount] = useState(8)

  const allMatched = useMemo(() =>
    matchSchemes(profile, searchQuery, activeType, activeCategory),
    [profile, searchQuery, activeType, activeCategory]
  )

  const visibleSchemes = allMatched.slice(0, visibleCount)
  const profileSummary = buildProfileSummary(profile)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{lang === 'hi' ? 'आपके परिणाम' : 'Your Results'}</p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {allMatched.length} {t.schemesFound}
              </h1>
              {profileSummary && (
                <p className="text-sm text-slate-500 mt-0.5">{t.basedOnProfile}</p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link to="/find-schemes" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                {t.editProfileLink} →
              </Link>
              {profile && (
                <button
                  onClick={clearProfile}
                  className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded"
                >
                  Clear profile
                </button>
              )}
            </div>
          </div>

          {/* Profile summary bar */}
          {profileSummary && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded px-4 py-2.5 flex items-center justify-between gap-3">
              <p className="text-sm text-blue-800 font-medium truncate">{profileSummary}</p>
              <Link to="/find-schemes" className="text-xs text-blue-600 hover:text-blue-800 flex-shrink-0">
                {t.editProfileLink}
              </Link>
            </div>
          )}

          {!profile && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded px-4 py-3">
              <p className="text-sm text-amber-800">
                {t.basedOnProfile}{' '}
                <Link to="/find-schemes" className="font-semibold underline">
                  {t.findSchemes}
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Search + Filters */}
        <div className="bg-white border border-slate-200 rounded p-4 mb-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <FilterBar
            activeType={activeType}
            onTypeChange={setActiveType}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={CATEGORIES}
          />
        </div>

        {/* Results */}
        {visibleSchemes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded p-12 text-center">
            <p className="text-slate-500">{t.noResults}</p>
            <button onClick={() => { setSearchQuery(''); setActiveType('all'); setActiveCategory(null) }} className="mt-3 text-sm text-blue-600 hover:text-blue-800">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {visibleSchemes.map(scheme => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  showRelevance={!!profile}
                />
              ))}
            </div>

            {visibleCount < allMatched.length && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setVisibleCount(c => c + 8)}
                  className="btn-secondary text-sm px-8"
                >
                  {t.loadMore}
                </button>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-slate-100 border border-slate-200 rounded p-4">
          <p className="text-xs text-slate-500 leading-relaxed">{t.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}
