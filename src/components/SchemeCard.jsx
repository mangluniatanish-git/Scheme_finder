import { Link } from 'react-router-dom'
import { ExternalLink, BookOpen, Heart, Home, Leaf, IndianRupee, Briefcase, GraduationCap, Users, Baby, Wrench, Factory, Accessibility } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { getRelevanceBadge } from '../utils/schemeMatcher'

const ICON_MAP = {
  BookOpen, Heart, Home, Leaf, IndianRupee, Briefcase,
  GraduationCap, Users, Baby, Wrench, Factory, Accessibility,
}

const CATEGORY_COLORS = {
  education: { icon: 'BookOpen', color: 'text-blue-600', bg: 'bg-blue-50' },
  health: { icon: 'Heart', color: 'text-rose-600', bg: 'bg-rose-50' },
  housing: { icon: 'Home', color: 'text-orange-600', bg: 'bg-orange-50' },
  employment: { icon: 'Briefcase', color: 'text-purple-600', bg: 'bg-purple-50' },
  agriculture: { icon: 'Leaf', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  financial: { icon: 'IndianRupee', color: 'text-green-600', bg: 'bg-green-50' },
  scholarships: { icon: 'GraduationCap', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  'women-child': { icon: 'Baby', color: 'text-pink-600', bg: 'bg-pink-50' },
  'social-welfare': { icon: 'Users', color: 'text-teal-600', bg: 'bg-teal-50' },
  skills: { icon: 'Wrench', color: 'text-amber-600', bg: 'bg-amber-50' },
  business: { icon: 'Factory', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  disability: { icon: 'Accessibility', color: 'text-slate-600', bg: 'bg-slate-100' },
}

function getCategoryStyle(categories) {
  if (!categories || categories.length === 0) return { icon: 'BookOpen', color: 'text-blue-600', bg: 'bg-blue-50' }
  return CATEGORY_COLORS[categories[0]] || { icon: 'BookOpen', color: 'text-blue-600', bg: 'bg-blue-50' }
}

export default function SchemeCard({ scheme, showRelevance = false }) {
  const { t, lang } = useLang()
  const style = getCategoryStyle(scheme.categories)
  const Icon = ICON_MAP[style.icon] || BookOpen

  const relevanceBadge = showRelevance && scheme.relevance && scheme.relevance !== 'neutral'
    ? getRelevanceBadge(scheme.relevance, t)
    : null

  const name = lang === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name
  const description = lang === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description
  const benefits = lang === 'hi' && scheme.benefitsHi ? scheme.benefitsHi : scheme.benefits

  return (
    <div className="bg-white border border-slate-200 rounded hover:shadow-md transition-shadow duration-150">
      <div className="p-5 sm:p-6">
        <div className="flex gap-4">
          {/* Icon */}
          <div className={`w-10 h-10 ${style.bg} rounded flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <Icon className={`w-5 h-5 ${style.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-start gap-2 mb-1.5">
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{name}</h3>
              {relevanceBadge && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded border ${relevanceBadge.color} flex-shrink-0`}>
                  {relevanceBadge.label}
                </span>
              )}
            </div>

            {/* Ministry + type */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs text-slate-500">{scheme.ministry}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                scheme.type === 'central'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-purple-50 text-purple-700'
              }`}>
                {scheme.type === 'central'
                  ? (lang === 'hi' ? 'केंद्र सरकार' : 'Central Govt')
                  : (lang === 'hi' ? 'राज्य सरकार' : 'State Govt')
                }
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">{description}</p>

            {/* Benefits */}
            {benefits && (
              <div className="flex items-start gap-1.5 mb-4">
                <IndianRupee className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">{benefits}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/schemes/${scheme.id}`}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded transition-colors"
              >
                {t.viewDetails}
              </Link>
              {scheme.officialUrl && (
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t.officialWebsite}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
