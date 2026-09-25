import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight, Info } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useProfile } from '../context/ProfileContext'
import { parseProfile } from '../utils/profileParser'
import ProfileChips from '../components/ProfileChips'

const EXAMPLE_EN = `I am a 22-year-old student from Mumbai, Maharashtra studying B.Tech Computer Engineering. My family's annual income is around ₹3.5 lakh per year. I belong to the OBC category and I am interested in scholarships and skill development opportunities.`

const EXAMPLE_HI = `मैं महाराष्ट्र के मुंबई का 22 वर्षीय छात्र हूं और कंप्यूटर इंजीनियरिंग में बी.टेक कर रहा हूं। मेरे परिवार की वार्षिक आय लगभग ₹3.5 लाख रुपये है। मैं OBC श्रेणी से हूं और मुझे छात्रवृत्ति तथा कौशल विकास योजनाओं में रुचि है।`

const LOADING_STEPS_EN = ['Understanding your profile...', 'Finding relevant scheme criteria...']
const LOADING_STEPS_HI = ['आपकी प्रोफ़ाइल समझी जा रही है...', 'प्रासंगिक योजना मानदंड खोजे जा रहे हैं...']

export default function FindSchemes() {
  const { t, lang } = useLang()
  const { rawText, setRawText, profile, setProfile } = useProfile()
  const navigate = useNavigate()

  const [text, setText] = useState(rawText || '')
  const [phase, setPhase] = useState(profile ? 'result' : 'input') // input | loading | result
  const [loadingStep, setLoadingStep] = useState(0)
  const [extracted, setExtracted] = useState(profile || null)

  const charCount = text.length
  const placeholder = lang === 'hi' ? t.textareaPlaceholder : t.textareaPlaceholder

  function handleLoadExample() {
    setText(lang === 'hi' ? EXAMPLE_HI : EXAMPLE_EN)
    setPhase('input')
    setExtracted(null)
  }

  function handleClear() {
    setText('')
    setPhase('input')
    setExtracted(null)
  }

  async function handleAnalyze() {
    if (!text.trim() || text.trim().length < 20) return
    setPhase('loading')
    setLoadingStep(0)

    // Step 1
    await new Promise(r => setTimeout(r, 900))
    setLoadingStep(1)

    // Step 2
    await new Promise(r => setTimeout(r, 800))

    const parsed = parseProfile(text)
    setExtracted(parsed)
    setRawText(text)
    setProfile(parsed)
    setPhase('result')
  }

  function handleRemoveChip(key) {
    if (!extracted) return
    const updated = { ...extracted }
    if (Array.isArray(updated[key])) updated[key] = []
    else updated[key] = null
    if (key === 'income') updated.incomeValue = null
    setExtracted(updated)
    setProfile(updated)
  }

  function handleFindSchemes() {
    navigate('/results')
  }

  function handleEditProfile() {
    setPhase('input')
  }

  const loadingSteps = lang === 'hi' ? LOADING_STEPS_HI : LOADING_STEPS_EN

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {t.findSchemesTitle}
          </h1>
          <p className="text-slate-600 text-base">{t.findSchemesSubtitle}</p>
        </div>

        {/* INPUT PHASE */}
        {(phase === 'input') && (
          <div className="space-y-6">
            {/* Language switch */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{lang === 'hi' ? 'भाषा:' : 'Write in:'}</span>
              <div className="flex items-center gap-0 border border-slate-200 rounded overflow-hidden text-sm font-medium">
                <button
                  onClick={() => {}}
                  className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  English
                </button>
                <button
                  onClick={() => {}}
                  className={`px-3 py-1.5 transition-colors ${lang === 'hi' ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  हिंदी
                </button>
              </div>
              <span className="text-xs text-slate-400 ml-auto">
                {lang === 'hi' ? 'नेवबार से भाषा बदलें' : 'Change language from Navbar'}
              </span>
            </div>

            {/* Textarea */}
            <div className="bg-white border border-slate-200 rounded overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={placeholder}
                rows={8}
                className="w-full px-4 pt-4 pb-2 text-slate-800 text-sm leading-relaxed resize-none focus:outline-none"
              />
              <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 bg-slate-50">
                <span className={`text-xs ${charCount > 800 ? 'text-red-500' : 'text-slate-400'}`}>
                  {charCount} {t.characters}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={handleLoadExample}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {t.loadExample}
                  </button>
                  {text && (
                    <button
                      onClick={handleClear}
                      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                    >
                      <X className="w-3 h-3" /> {t.clearBtn}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded p-3">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">{t.privacyNote}</p>
            </div>

            {/* Submit */}
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || text.trim().length < 20}
              className="btn-primary w-full justify-center text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.analyzeBtn}
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        {/* LOADING PHASE */}
        {phase === 'loading' && (
          <div className="bg-white border border-slate-200 rounded p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 border-3 border-blue-700 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-2">
              {loadingSteps.map((step, i) => (
                <p
                  key={i}
                  className={`text-sm transition-all duration-300 ${
                    i <= loadingStep ? 'text-slate-800 font-medium' : 'text-slate-300'
                  }`}
                >
                  {i < loadingStep && '✓ '}
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* RESULT PHASE */}
        {phase === 'result' && extracted && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-900 text-base">{t.profileExtracted}</h2>
                <button
                  onClick={handleEditProfile}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t.editProfile}
                </button>
              </div>

              <ProfileChips
                profile={extracted}
                onRemove={handleRemoveChip}
              />
            </div>

            {/* Privacy + disclaimer */}
            <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded p-3">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">{t.privacyNote}</p>
            </div>

            <button
              onClick={handleFindSchemes}
              className="btn-primary w-full justify-center text-base py-3"
            >
              {t.findMatchingSchemes}
              <ChevronRight className="w-4.5 h-4.5" />
            </button>

            <p className="text-center text-xs text-slate-400">{t.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
