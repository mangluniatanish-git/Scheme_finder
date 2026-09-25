import {
  BookOpen,
  IndianRupee,
  Briefcase,
  Heart,
  Home,
  Leaf,
  CheckCircle2,
  TrendingUp,
  Star,
} from 'lucide-react'

const schemeCards = [
  { icon: BookOpen, label: 'Education Assistance', color: 'text-blue-600', bg: 'bg-blue-50', match: '98%' },
  { icon: IndianRupee, label: 'Financial Support', color: 'text-green-600', bg: 'bg-green-50', match: '95%' },
  { icon: Briefcase, label: 'Employment Scheme', color: 'text-purple-600', bg: 'bg-purple-50', match: '89%' },
  { icon: Home, label: 'Housing Benefit', color: 'text-orange-600', bg: 'bg-orange-50', match: '82%' },
  { icon: Heart, label: 'Health Coverage', color: 'text-rose-600', bg: 'bg-rose-50', match: '79%' },
  { icon: Leaf, label: 'Agriculture Aid', color: 'text-emerald-600', bg: 'bg-emerald-50', match: '74%' },
]

export default function HeroDashboard() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-blue-200/30 blur-3xl rounded-3xl -z-10" />

      {/* Main dashboard card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Dashboard header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wide">Your Results</p>
              <p className="text-white font-bold text-xl mt-0.5">12 Relevant Schemes</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                <Star className="w-3 h-3 fill-white" />
                Top Match
              </div>
              <p className="text-blue-100 text-xs mt-1">Updated today</p>
            </div>
          </div>

          {/* Match score bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-blue-100 mb-1.5">
              <span>Overall Match Score</span>
              <span className="text-white font-semibold">95%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: '95%' }}
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
          {[
            { label: 'Eligible', value: '8', icon: CheckCircle2, color: 'text-green-600' },
            { label: 'Potential', value: '4', icon: TrendingUp, color: 'text-blue-600' },
            { label: 'Saved', value: '3', icon: Star, color: 'text-amber-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="px-3 py-3 text-center">
              <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
              <p className="text-slate-900 font-bold text-base leading-none">{value}</p>
              <p className="text-slate-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Scheme list */}
        <div className="p-4 space-y-2.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Matches</p>
          {schemeCards.map(({ icon: Icon, label, color, bg, match }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 text-sm font-medium truncate">{label}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: match }}
                  />
                </div>
                <span className="text-xs font-semibold text-green-600">{match}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="px-4 pb-4">
          <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-slate-600 text-sm">View all 12 schemes</span>
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        ✓ 95% Match
      </div>
      <div className="absolute -bottom-3 -left-3 bg-white border border-slate-200 shadow-lg text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-full">
        🇮🇳 Official Sources
      </div>
    </div>
  )
}
