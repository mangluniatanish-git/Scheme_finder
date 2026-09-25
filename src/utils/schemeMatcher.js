// schemeMatcher.js
// Matches extracted profile against scheme eligibility criteria.
// Returns schemes with relevance labels (no fake percentages).
// Designed to be replaced by a real backend API later.

import { schemes } from '../data/schemes.js'

/**
 * Match a profile against all schemes.
 * Returns schemes sorted by relevance score (strong → partial → relevant → all).
 */
export function matchSchemes(profile, searchQuery = '', activeFilter = 'all', categoryFilter = null) {
  if (!profile && !searchQuery && activeFilter === 'all' && !categoryFilter) {
    return schemes.map(s => ({ ...s, relevance: 'neutral', matchDetails: [] }))
  }

  const scored = schemes.map(scheme => {
    const { score, details } = scoreScheme(scheme, profile)
    return { ...scheme, _score: score, matchDetails: details, relevance: getRelevanceLabel(score) }
  })

  let filtered = scored

  // Filter by type (central/state)
  if (activeFilter === 'central') filtered = filtered.filter(s => s.type === 'central')
  if (activeFilter === 'state') filtered = filtered.filter(s => s.type === 'state')

  // Filter by category
  if (categoryFilter) filtered = filtered.filter(s => s.categories.includes(categoryFilter))

  // Filter by search query
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim()
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.ministry.toLowerCase().includes(q) ||
      s.categories.some(c => c.toLowerCase().includes(q)) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.keywords.some(k => k.toLowerCase().includes(q)) ||
      (s.benefits && s.benefits.toLowerCase().includes(q))
    )
  }

  // Sort by score descending
  return filtered.sort((a, b) => b._score - a._score)
}

function scoreScheme(scheme, profile) {
  if (!profile) return { score: 0, details: [] }

  const { eligibility } = scheme
  let score = 0
  const details = []

  // ── Age ──────────────────────────────────────────────────────────────────
  if (profile.age) {
    const age = profile.age
    if (eligibility.minAge && eligibility.maxAge) {
      if (age >= eligibility.minAge && age <= eligibility.maxAge) {
        score += 25
        details.push({ key: 'age', match: true, note: `Age ${age} meets requirement (${eligibility.minAge}–${eligibility.maxAge})` })
      } else {
        score -= 30
        details.push({ key: 'age', match: false, note: `Age ${age} outside range (${eligibility.minAge}–${eligibility.maxAge})` })
      }
    } else if (eligibility.minAge) {
      if (age >= eligibility.minAge) {
        score += 15
        details.push({ key: 'age', match: true, note: `Age meets minimum requirement (${eligibility.minAge}+)` })
      } else {
        score -= 30
        details.push({ key: 'age', match: false, note: `Age below minimum (${eligibility.minAge})` })
      }
    } else if (eligibility.maxAge) {
      if (age <= eligibility.maxAge) {
        score += 15
        details.push({ key: 'age', match: true, note: `Age meets maximum requirement (up to ${eligibility.maxAge})` })
      } else {
        score -= 30
        details.push({ key: 'age', match: false, note: `Age above maximum (${eligibility.maxAge})` })
      }
    }
  }

  // ── Occupation ───────────────────────────────────────────────────────────
  if (profile.occupation && eligibility.occupation) {
    const matchOcc = eligibility.occupation.some(o =>
      profile.occupation.toLowerCase().includes(o.toLowerCase()) ||
      o.toLowerCase().includes(profile.occupation.toLowerCase())
    )
    if (matchOcc) {
      score += 25
      details.push({ key: 'occupation', match: true, note: `Occupation matches (${profile.occupation})` })
    } else {
      score -= 20
      details.push({ key: 'occupation', match: false, note: `Occupation may not match (scheme for: ${eligibility.occupation.join(', ')})` })
    }
  }

  // ── Income ────────────────────────────────────────────────────────────────
  if (profile.incomeValue != null && eligibility.maxIncomeLakh != null) {
    if (profile.incomeValue <= eligibility.maxIncomeLakh) {
      score += 20
      details.push({ key: 'income', match: true, note: `Income within limit (≤₹${eligibility.maxIncomeLakh}L)` })
    } else {
      score -= 15
      details.push({ key: 'income', match: false, note: `Income may exceed limit (₹${eligibility.maxIncomeLakh}L)` })
    }
  }

  // ── Category ─────────────────────────────────────────────────────────────
  if (profile.category && eligibility.category) {
    const matchCat = eligibility.category.some(c =>
      c.toLowerCase() === profile.category.toLowerCase()
    )
    if (matchCat) {
      score += 20
      details.push({ key: 'category', match: true, note: `Category matches (${profile.category})` })
    } else {
      details.push({ key: 'category', match: 'partial', note: `Category: scheme targets ${eligibility.category.join('/')}` })
    }
  }

  // ── State ─────────────────────────────────────────────────────────────────
  if (profile.state && eligibility.states) {
    if (eligibility.states.includes(profile.state)) {
      score += 15
      details.push({ key: 'state', match: true, note: `State matches (${profile.state})` })
    } else {
      score -= 20
      details.push({ key: 'state', match: false, note: `State may not match` })
    }
  }

  // ── Gender ────────────────────────────────────────────────────────────────
  if (profile.gender && eligibility.gender) {
    if (profile.gender.toLowerCase() === eligibility.gender.toLowerCase()) {
      score += 10
      details.push({ key: 'gender', match: true, note: `Gender matches` })
    } else {
      score -= 25
      details.push({ key: 'gender', match: false, note: `Scheme for ${eligibility.gender} only` })
    }
  }

  // ── Interest keyword match ─────────────────────────────────────────────
  if (profile.interests && profile.interests.length > 0) {
    const interestMatch = profile.interests.some(interest =>
      scheme.categories.some(cat => cat.toLowerCase().includes(interest.toLowerCase().replace(' ', '-'))) ||
      scheme.tags.some(tag => interest.toLowerCase().includes(tag.toLowerCase())) ||
      scheme.keywords.some(kw => interest.toLowerCase().includes(kw.toLowerCase()))
    )
    if (interestMatch) {
      score += 10
      details.push({ key: 'interests', match: true, note: `Matches your interests` })
    }
  }

  // ── Disability ────────────────────────────────────────────────────────────
  if (profile.disability === 'Yes') {
    if (scheme.categories.includes('disability') || scheme.tags.includes('disability')) {
      score += 15
      details.push({ key: 'disability', match: true, note: `Relevant for persons with disability` })
    }
  }

  return { score: Math.max(score, 0), details }
}

function getRelevanceLabel(score) {
  if (score >= 55) return 'strong'
  if (score >= 30) return 'partial'
  if (score >= 10) return 'relevant'
  return 'neutral'
}

export function getRelevanceBadge(relevance, t) {
  switch (relevance) {
    case 'strong': return { label: t.matchesYourProfile, color: 'text-green-700 bg-green-50 border-green-200' }
    case 'partial': return { label: t.relevantProfile, color: 'text-blue-700 bg-blue-50 border-blue-200' }
    default: return { label: t.verifyEligibility, color: 'text-amber-700 bg-amber-50 border-amber-200' }
  }
}
