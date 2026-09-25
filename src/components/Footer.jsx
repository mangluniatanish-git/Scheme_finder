import { Link } from 'react-router-dom'
import { Compass, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLang()

  const footerLinks = {
    [lang === 'hi' ? 'नेविगेशन' : 'Navigation']: [
      { to: '/', label: t.home },
      { to: '/find-schemes', label: t.findSchemes },
      { to: '/categories', label: t.categories },
      { to: '/schemes', label: t.allSchemes },
      { to: '/about', label: t.about },
      { to: '/faq', label: t.faq },
    ],
    [lang === 'hi' ? 'सहायता' : 'Help']: [
      { to: '/assistant', label: lang === 'hi' ? 'AI सहायक' : 'AI Assistant' },
      { to: '/faq', label: lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQ' },
    ],
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Compass className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Scheme<span className="text-blue-400">Finder</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              {t.footerDesc}
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 bg-slate-800 text-slate-400 text-xs px-3 py-1.5 rounded">
              <ExternalLink className="w-3 h-3" />
              {t.officialSources}
            </div>
          </div>

          {/* Navigation links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SchemeFinder. {lang === 'hi' ? 'केवल सूचनात्मक उद्देश्यों के लिए।' : 'For informational purposes only.'}
          </p>
          <p className="text-xs text-slate-500 max-w-md text-left sm:text-right leading-relaxed">
            {t.footerDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
