import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, MessageSquare, Search, FileText } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { CATEGORIES } from '../data/schemes'

export default function Home() {
  const { t, lang } = useLang()

  const steps = [
    { icon: MessageSquare, step: '01', titleKey: 'step1Title', descKey: 'step1Desc', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: Search, step: '02', titleKey: 'step2Title', descKey: 'step2Desc', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { icon: FileText, step: '03', titleKey: 'step3Title', descKey: 'step3Desc', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100' },
  ]

  // Top 8 categories for home strip
  const featuredCategories = CATEGORIES.slice(0, 8)

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-3xl">
            {/* Gov badge */}
            <div className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded mb-6">
              <span className="text-base">🇮🇳</span>
              {lang === 'hi' ? 'आधिकारिक सरकारी स्रोतों से जानकारी' : 'Information from official government sources'}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
              {t.heroTitle}
            </h1>

            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/find-schemes" className="btn-primary text-base px-6 py-3">
                {t.heroPrimary}
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <Link to="/schemes" className="btn-secondary text-base px-6 py-3">
                {t.heroSecondary}
              </Link>
            </div>

            {/* Simple trust row */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>✓ {lang === 'hi' ? 'निःशुल्क — कोई खाता नहीं चाहिए' : 'Free — no account needed'}</span>
              <span>✓ {lang === 'hi' ? 'सभी 28 राज्यों की योजनाएं' : 'Schemes from all 28 states'}</span>
              <span>✓ {lang === 'hi' ? 'हिंदी और अंग्रेजी में' : 'Available in Hindi & English'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <section className="bg-slate-50 border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'hi' ? 'श्रेणी के अनुसार देखें' : 'Browse by category'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {featuredCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/schemes?category=${cat.id}`}
                className="flex flex-col items-center gap-1.5 p-3 bg-white border border-slate-200 rounded hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
              >
                <div className={`w-8 h-8 ${cat.bg} rounded flex items-center justify-center`}>
                  <span className={`text-xs font-bold ${cat.color}`}>{cat.label.slice(0, 2)}</span>
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700 leading-tight">
                  {lang === 'hi' ? cat.labelHi : cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-tag">{t.howItWorksTitle}</span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.howItWorksSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, step, titleKey, descKey, color, bg, border }) => (
              <div key={step} className={`flex flex-col gap-4 p-6 rounded border ${border} ${bg}`}>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 bg-white rounded flex items-center justify-center border ${border} shadow-sm`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className={`text-2xl font-black ${color} opacity-20`}>{step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{t[titleKey]}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t[descKey]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/find-schemes" className="btn-primary inline-flex mx-auto">
              {t.heroPrimary}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── INFO BANNER ── */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {lang === 'hi' ? 'अपनी प्रोफ़ाइल के अनुसार योजनाएं खोजें' : 'Find schemes that fit your profile'}
              </h2>
              <p className="text-blue-100 text-sm max-w-xl">
                {lang === 'hi'
                  ? 'हिंदी या अंग्रेजी में अपने बारे में बताएं — SchemeFinder आपके लिए प्रासंगिक सरकारी योजनाएं खोजेगा।'
                  : 'Describe yourself in Hindi or English — SchemeFinder will find relevant government schemes for you.'
                }
              </p>
            </div>
            <Link
              to="/find-schemes"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold px-6 py-3 rounded transition-colors"
            >
              {t.heroPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="bg-slate-50 border-t border-slate-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-500 max-w-3xl mx-auto">
            {t.disclaimer}
          </p>
        </div>
      </section>
    </>
  )
}
