import { createContext, useContext, useState, useEffect } from 'react'

const ProfileContext = createContext()

const STORAGE_KEY = 'sf_profile'
const TEXT_KEY = 'sf_raw_text'

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [rawText, setRawText] = useState(() => {
    try {
      return localStorage.getItem(TEXT_KEY) || ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [profile])

  useEffect(() => {
    try {
      if (rawText) localStorage.setItem(TEXT_KEY, rawText)
      else localStorage.removeItem(TEXT_KEY)
    } catch {}
  }, [rawText])

  const clearProfile = () => {
    setProfile(null)
    setRawText('')
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, rawText, setRawText, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
