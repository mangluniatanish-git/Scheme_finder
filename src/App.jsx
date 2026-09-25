import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ProfileProvider } from './context/ProfileContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import FindSchemes from './pages/FindSchemes'
import Results from './pages/Results'
import Categories from './pages/Categories'
import AllSchemes from './pages/AllSchemes'
import SchemeDetail from './pages/SchemeDetail'
import Assistant from './pages/Assistant'
import About from './pages/About'
import FAQ from './pages/FAQ'

export default function App() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/find-schemes" element={<FindSchemes />} />
              <Route path="/results" element={<Results />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/schemes" element={<AllSchemes />} />
              <Route path="/schemes/:id" element={<SchemeDetail />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </LanguageProvider>
  )
}
