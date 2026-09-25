import { useParams, Link } from 'react-router-dom'
import { ExternalLink, ArrowLeft, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useProfile } from '../context/ProfileContext'
import { getSchemeById } from '../data/schemes'

function ProfileMatchRow({ icon: Icon, matched, note }) {
  const color = matched === true ? 'text-green-700' : matched === false ? 'text-red-600' : 'text-amber-600'
  const bg = matched === true ? 'bg-green-50' : matched === false ? 'bg-red-50' : 'bg-amber-50'
  const MatchIcon = matched === true ? CheckCircle2 : AlertCircle
  return (
    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded ${bg}`}>
      <MatchIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${color}`} />
      <p className={`text-sm ${color}`}>{note}</p>
    </div>
  )
}

export default function SchemeDetail() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const { profile } = useProfile()

  const scheme = getSchemeById(id)

  if (!scheme) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{lang === 'hi' ? 'योजना नहीं मिली।' : 'Scheme not found.'}</p>
          <Link to="/schemes" className="btn-primary inline-flex">
            {lang === 'hi' ? 'सभी योजनाएं देखें' : 'Browse All Schemes'}
          </Link>
        </div>
      </div>
    )
  }

  const name = lang === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name
  const description = lang === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description
  const benefits = lang === 'hi' && scheme.benefitsHi ? scheme.benefitsHi : scheme.benefits

  // Build profile match details for this scheme
  const profileMatchDetails = []
  if (profile && scheme.eligibility) {
    const el = scheme.eligibility
    if (profile.age && (el.minAge || el.maxAge)) {
      const inRange = (!el.minAge || profile.age >= el.minAge) && (!el.maxAge || profile.age <= el.maxAge)
      profileMatchDetails.push({
        matched: inRange,
        note: inRange
          ? `Age ${profile.age} meets requirement`
          : `Age ${profile.age} — scheme requires ${el.minAge ? `${el.minAge}+` : ''}${el.maxAge ? ` up to ${el.maxAge}` : ''}`,
      })
    }
    if (profile.state && el.states) {
      const stateMatch = el.states.includes(profile.state)
      profileMatchDetails.push({ matched: stateMatch, note: stateMatch ? `State (${profile.state}) matches` : `State may not match` })
    }
    if (profile.occupation && el.occupation) {
      const occMatch = el.occupation.some(o => profile.occupation.toLowerCase().includes(o.toLowerCase()))
      profileMatchDetails.push({ matched: occMatch, note: occMatch ? `Occupation (${profile.occupation}) matches` : `Occupation may not qualify — scheme for: ${el.occupation.join(', ')}` })
    }
    if (profile.incomeValue != null && el.maxIncomeLakh != null) {
      const incMatch = profile.incomeValue <= el.maxIncomeLakh
      profileMatchDetails.push({ matched: incMatch, note: incMatch ? `Income within limit (≤₹${el.maxIncomeLakh}L)` : `Income may exceed limit (₹${el.maxIncomeLakh}L)` })
    }
    if (profile.category && el.category) {
      const catMatch = el.category.some(c => c.toLowerCase() === profile.category.toLowerCase())
      profileMatchDetails.push({
        matched: catMatch ? true : 'partial',
        note: catMatch ? `Category (${profile.category}) matches` : `Category: scheme targets ${el.category.join('/')}`,
      })
    }
    if (el.gender && profile.gender) {
      const gMatch = el.gender.toLowerCase() === profile.gender.toLowerCase()
      profileMatchDetails.push({ matched: gMatch, note: gMatch ? `Gender matches` : `Scheme is for ${el.gender} only` })
    }
    if (!profile.income && el.maxIncomeLakh) {
      profileMatchDetails.push({ matched: 'partial', note: `Income information not provided — scheme has income limit of ₹${el.maxIncomeLakh}L` })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back nav */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <Link to="/schemes" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" />
            {lang === 'hi' ? 'सभी योजनाएं' : 'All Schemes'}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Header card */}
            <div className="bg-white border border-slate-200 rounded p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded ${scheme.type === 'central' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                  {scheme.type === 'central' ? t.centralGovt : t.stateGovt}
                </span>
                {scheme.categories.slice(0, 2).map(cat => (
                  <span key={cat} className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-600 capitalize">{cat.replace('-', ' ')}</span>
                ))}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{name}</h1>
              <p className="text-sm text-slate-500 mb-4">{scheme.ministry}</p>
              <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>

            {/* Benefits */}
            <div className="bg-white border border-slate-200 rounded p-6">
              <h2 className="font-bold text-slate-900 text-base mb-3">{t.benefits}</h2>
              <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded p-3">
                <span className="text-green-600 text-lg">₹</span>
                <p className="text-green-800 font-medium">{benefits}</p>
              </div>
            </div>

            {/* Eligibility */}
            {scheme.eligibility && (
              <div className="bg-white border border-slate-200 rounded p-6">
                <h2 className="font-bold text-slate-900 text-base mb-4">{t.eligibility}</h2>
                <div className="space-y-2.5 text-sm text-slate-700">
                  {scheme.eligibility.minAge && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">Min Age:</span><span>{scheme.eligibility.minAge} years</span></div>
                  )}
                  {scheme.eligibility.maxAge && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">Max Age:</span><span>{scheme.eligibility.maxAge} years</span></div>
                  )}
                  {scheme.eligibility.occupation && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">Occupation:</span><span className="capitalize">{scheme.eligibility.occupation.join(', ')}</span></div>
                  )}
                  {scheme.eligibility.maxIncomeLakh && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">Max Income:</span><span>₹{scheme.eligibility.maxIncomeLakh} lakh/year</span></div>
                  )}
                  {scheme.eligibility.category && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">Category:</span><span>{scheme.eligibility.category.join(', ')}</span></div>
                  )}
                  {scheme.eligibility.gender && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">Gender:</span><span className="capitalize">{scheme.eligibility.gender}</span></div>
                  )}
                  {scheme.eligibility.states && (
                    <div className="flex gap-2"><span className="text-slate-400 w-32 flex-shrink-0">States:</span><span>{scheme.eligibility.states.join(', ')}</span></div>
                  )}
                  {scheme.eligibility.notes && (
                    <div className="mt-3 flex items-start gap-2 bg-slate-50 border border-slate-200 rounded p-3">
                      <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-600 text-xs">{scheme.eligibility.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile match */}
            {profile && profileMatchDetails.length > 0 && (
              <div className="bg-white border border-slate-200 rounded p-6">
                <h2 className="font-bold text-slate-900 text-base mb-1">{t.yourProfileMatch}</h2>
                <p className="text-xs text-slate-500 mb-4">{t.matchNote}</p>
                <div className="space-y-2">
                  {profileMatchDetails.map((d, i) => (
                    <ProfileMatchRow key={i} matched={d.matched} note={d.note} />
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded p-4">
              <p className="text-xs text-amber-800 leading-relaxed">{t.disclaimer}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Official source card */}
            <div className="bg-white border border-slate-200 rounded p-5">
              <h3 className="font-semibold text-slate-900 text-sm mb-4">{t.officialSource}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{lang === 'hi' ? 'मंत्रालय' : 'Ministry'}</p>
                  <p className="text-sm text-slate-800 font-medium">{scheme.ministry}</p>
                </div>
                {scheme.department && (
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{lang === 'hi' ? 'विभाग' : 'Department'}</p>
                    <p className="text-sm text-slate-700">{scheme.department}</p>
                  </div>
                )}
                {scheme.lastUpdated && (
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{t.lastVerified}</p>
                    <p className="text-sm text-slate-700">{scheme.lastUpdated}</p>
                  </div>
                )}
                {scheme.sourceVerified && (
                  <div className="flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 rounded px-2.5 py-1.5 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {lang === 'hi' ? 'सत्यापित आधिकारिक स्रोत' : 'Verified official source'}
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-2">
                {scheme.officialUrl && (
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2.5 rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.viewOfficialSource}
                  </a>
                )}
                {scheme.applyUrl && (
                  <a
                    href={scheme.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 px-4 py-2.5 rounded transition-colors"
                  >
                    {t.applyOnWebsite}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Tags */}
            {scheme.tags && scheme.tags.length > 0 && (
              <div className="bg-white border border-slate-200 rounded p-5">
                <h3 className="font-semibold text-slate-900 text-sm mb-3">{lang === 'hi' ? 'टैग' : 'Tags'}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* No profile? */}
            {!profile && (
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  {lang === 'hi' ? 'जानें कि क्या यह योजना आपके लिए है' : 'Know if this scheme is for you'}
                </p>
                <p className="text-xs text-blue-700 mb-3">
                  {lang === 'hi' ? 'अपनी प्रोफ़ाइल बताएं और हम आपकी पात्रता जांचेंगे।' : 'Tell us your profile and we\'ll check your eligibility.'}
                </p>
                <Link to="/find-schemes" className="btn-primary text-sm w-full justify-center">
                  {t.findSchemesBtn}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
