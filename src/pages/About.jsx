import { Link } from 'react-router-dom'
import { Compass, Target, ShieldCheck, BookOpenCheck, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To make government schemes discoverable and understandable for every Indian citizen — regardless of digital literacy or awareness.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Data',
    desc: 'All scheme information is sourced directly from official government portals: MyScheme.gov.in, India.gov.in, and state portals.',
  },
  {
    icon: BookOpenCheck,
    title: 'Plain Language',
    desc: 'We translate complex eligibility criteria and bureaucratic language into simple, actionable information anyone can understand.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-200">
            <Compass className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About SchemeFinder
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            India has hundreds of government welfare schemes — but most citizens don't know 
            which ones they qualify for. SchemeFinder bridges that gap with a simple, 
            personalized discovery experience.
          </p>
        </div>

        {/* Values */}
        <div className="space-y-4 mb-12">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex gap-5">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5.5 h-5.5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer box */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10">
          <h3 className="font-bold text-amber-900 text-sm mb-2">Important Disclaimer</h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            SchemeFinder is an informational discovery tool only. We do not determine, confirm, 
            or guarantee eligibility. Final eligibility for any government scheme is determined 
            solely by the respective government authority. Always verify information from official 
            government sources before applying.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/find-schemes" className="btn-primary inline-flex mx-auto text-base px-8">
            Start Finding Schemes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
