import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Compass, ChevronRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: t.home },
    { to: '/find-schemes', label: t.findSchemes },
    { to: '/categories', label: t.categories },
    { to: '/schemes', label: t.allSchemes },
    { to: '/about', label: t.about },
    { to: '/faq', label: t.faq },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white shadow-sm border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center group-hover:bg-blue-800 transition-colors">
              <Compass className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-slate-900 font-bold text-base tracking-tight">
              Scheme<span className="text-blue-700">Finder</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side: lang switch + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center gap-0 border border-slate-200 rounded overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 transition-colors ${lang === 'hi' ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                हिंदी
              </button>
            </div>

            <Link
              to="/find-schemes"
              className="btn-primary text-sm py-2 px-4"
            >
              {t.findSchemesBtn}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center gap-0 border border-slate-200 rounded overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 transition-colors ${lang === 'en' ? 'bg-blue-700 text-white' : 'text-slate-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 transition-colors ${lang === 'hi' ? 'bg-blue-700 text-white' : 'text-slate-500'}`}
              >
                हि
              </button>
            </div>
            <button
              className="p-2 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-2 pb-1 border-t border-slate-100 mt-1">
              <Link
                to="/find-schemes"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center text-sm"
              >
                {t.findSchemesBtn}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
