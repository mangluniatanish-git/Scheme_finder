import { Link } from 'react-router-dom'
import {
  BookOpen, Heart, Home, Leaf, IndianRupee, Briefcase,
  GraduationCap, Users, Baby, Wrench, Factory, Accessibility,
  ChevronRight,
} from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { CATEGORIES } from '../data/schemes'

const ICON_MAP = {
  BookOpen, Heart, Home, Leaf, IndianRupee, Briefcase,
  GraduationCap, Users, Baby, Wrench, Factory, Accessibility,
}

export default function Categories() {
  const { t, lang } = useLang()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
            {lang === 'hi' ? 'सभी श्रेणियाँ' : 'All Categories'}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{t.categoriesTitle}</h1>
          <p className="text-slate-600 text-base">{t.categoriesSubtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => {
            const Icon = ICON_MAP[cat.icon] || BookOpen
            return (
              <Link
                key={cat.id}
                to={`/schemes?category=${cat.id}`}
                className="group bg-white border border-slate-200 rounded p-5 hover:shadow-md hover:border-blue-300 transition-all duration-150 flex items-center gap-4"
              >
                <div className={`w-12 h-12 ${cat.bg} rounded flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-700">
                    {lang === 'hi' ? cat.labelHi : cat.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lang === 'hi' ? 'योजनाएं देखें' : 'View schemes'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 flex-shrink-0" />
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-blue-50 border border-blue-200 rounded p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-900 mb-1">
              {lang === 'hi' ? 'नहीं पता कहाँ से शुरू करें?' : 'Not sure where to start?'}
            </p>
            <p className="text-sm text-slate-600">
              {lang === 'hi'
                ? 'अपनी प्रोफ़ाइल बताएं और हम आपके लिए सही योजनाएं खोजेंगे।'
                : 'Tell us your profile and we\'ll find the right schemes for you.'
              }
            </p>
          </div>
          <Link to="/find-schemes" className="btn-primary text-sm flex-shrink-0">
            {t.findSchemesBtn}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
