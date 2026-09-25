import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Navbar
    home: 'Home',
    findSchemes: 'Find Schemes',
    categories: 'Categories',
    allSchemes: 'All Schemes',
    about: 'About',
    faq: 'FAQ',
    findSchemesBtn: 'Find Schemes For Me',

    // Home
    heroTitle: 'Find Government Schemes That Match Your Profile',
    heroSubtitle: 'Describe yourself in English or Hindi. SchemeFinder understands your profile and finds relevant government schemes from official sources.',
    heroPrimary: 'Find Schemes For Me',
    heroSecondary: 'Browse All Schemes',
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Three simple steps to discover government schemes relevant to you.',
    step1Title: 'Describe Your Profile',
    step1Desc: 'Write about yourself in plain English or Hindi \u2014 your age, location, occupation, income, and what you are looking for.',
    step2Title: 'We Understand You',
    step2Desc: 'SchemeFinder reads your profile and extracts key details like state, category, income, and interests.',
    step3Title: 'Find Matching Schemes',
    step3Desc: 'View government schemes from official sources that are relevant to your profile and needs.',

    // FindSchemes
    findSchemesTitle: 'Tell us about yourself',
    findSchemesSubtitle: "Describe your profile naturally. You don't need to fill out a long form.",
    textareaPlaceholder: 'Example: I am a 22-year-old student from Maharashtra studying B.Tech. My family income is ₹3.5 lakh per year. I belong to the OBC category and I am interested in scholarships and skill development.',
    analyzeBtn: 'Analyze My Profile',
    clearBtn: 'Clear',
    loadExample: 'Load example',
    characters: 'characters',
    analyzingStep1: 'Understanding your profile...',
    analyzingStep2: 'Finding relevant scheme criteria...',
    profileExtracted: "Here's what we understood",
    editProfile: 'Edit Profile',
    findMatchingSchemes: 'Find Matching Schemes',
    notProvided: 'Not provided',
    privacyNote: 'Your profile is used to identify potentially relevant schemes. Please avoid sharing unnecessary sensitive information.',

    // Profile fields
    age: 'Age',
    gender: 'Gender',
    state: 'State',
    city: 'City / District',
    income: 'Family Income',
    occupation: 'Occupation',
    education: 'Education',
    category: 'Category',
    disability: 'Disability',
    interests: 'Interests',

    // Results
    schemesFound: 'Schemes Found',
    editProfileLink: 'Edit Profile',
    searchPlaceholder: 'Search schemes by name, category or keyword...',
    all: 'All',
    centralGovt: 'Central Govt',
    stateGovt: 'State Govt',
    viewDetails: 'View Details',
    officialWebsite: 'Official Website',
    matchesYourProfile: 'Matches your profile',
    relevantProfile: 'Relevant based on your profile',
    verifyEligibility: 'Verify eligibility',
    loadMore: 'Load more schemes',
    noResults: 'No schemes found matching your search.',
    basedOnProfile: 'Based on the profile you provided, we found relevant government schemes.',
    disclaimer: 'SchemeFinder provides scheme discovery and informational guidance. A profile match does not guarantee eligibility or approval. Please verify the latest eligibility requirements on the official government website.',

    // SchemeDetail
    overview: 'Overview',
    benefits: 'Benefits',
    eligibility: 'Eligibility',
    yourProfileMatch: 'Your Profile Match',
    officialSource: 'Official Source',
    applyOnWebsite: 'Apply on Official Website',
    viewOfficialSource: 'View Official Source',
    lastVerified: 'Last verified',
    matchNote: 'This scheme appears relevant based on the information provided. Final eligibility is determined by the respective government authority.',

    // Categories
    categoriesTitle: 'Browse by Category',
    categoriesSubtitle: 'Explore government schemes across all major categories.',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Common questions about SchemeFinder and government schemes.',

    // Footer
    footerDesc: 'Helping citizens discover and understand government schemes, benefits, and financial assistance — simply and clearly.',
    officialSources: 'Information sourced from official government portals',
    footerDisclaimer: 'SchemeFinder is an informational discovery tool. Final eligibility for any government scheme is determined solely by the respective government authority. Always verify from official sources.',
  },

  hi: {
    // Navbar
    home: 'होम',
    findSchemes: 'योजनाएं खोजें',
    categories: 'श्रेणियाँ',
    allSchemes: 'सभी योजनाएं',
    about: 'हमारे बारे में',
    faq: 'सहायता',
    findSchemesBtn: 'मेरे लिए योजनाएं खोजें',

    // Home
    heroTitle: 'अपनी प्रोफ़ाइल के अनुसार सरकारी योजनाएं खोजें',
    heroSubtitle: 'हिंदी या अंग्रेजी में अपने बारे में बताएं। SchemeFinder आपकी प्रोफ़ाइल समझकर सरकारी स्रोतों से आपके लिए प्रासंगिक योजनाएं खोजता है।',
    heroPrimary: 'मेरे लिए योजनाएं खोजें',
    heroSecondary: 'सभी योजनाएं देखें',
    howItWorksTitle: 'यह कैसे काम करता है',
    howItWorksSubtitle: 'आपके लिए प्रासंगिक सरकारी योजनाएं खोजने के तीन सरल चरण।',
    step1Title: 'अपनी प्रोफ़ाइल बताएं',
    step1Desc: 'हिंदी या अंग्रेजी में अपनी आयु, स्थान, व्यवसाय, आय और ज़रूरतों के बारे में लिखें।',
    step2Title: 'हम आपको समझते हैं',
    step2Desc: 'SchemeFinder आपकी प्रोफ़ाइल पढ़कर राज्य, श्रेणी, आय और रुचियों जैसी जानकारी निकालता है।',
    step3Title: 'मिलती-जुलती योजनाएं खोजें',
    step3Desc: 'सरकारी स्रोतों से आपकी प्रोफ़ाइल के अनुसार प्रासंगिक योजनाएं देखें।',

    // FindSchemes
    findSchemesTitle: 'अपने बारे में बताएं',
    findSchemesSubtitle: 'अपनी प्रोफ़ाइल स्वाभाविक रूप से लिखें। आपको लंबा फॉर्म भरने की जरूरत नहीं है।',
    textareaPlaceholder: 'उदाहरण: मैं महाराष्ट्र का 22 वर्षीय छात्र हूं और बी.टेक की पढ़ाई कर रहा हूं। मेरे परिवार की वार्षिक आय 3.5 लाख रुपये है। मैं OBC श्रेणी से हूं और मुझे छात्रवृत्ति तथा कौशल विकास योजनाओं में रुचि है।',
    analyzeBtn: 'मेरी प्रोफ़ाइल विश्लेषण करें',
    clearBtn: 'साफ करें',
    loadExample: 'उदाहरण लोड करें',
    characters: 'अक्षर',
    analyzingStep1: 'आपकी प्रोफ़ाइल समझी जा रही है...',
    analyzingStep2: 'प्रासंगिक योजना मानदंड खोजे जा रहे हैं...',
    profileExtracted: 'हमने यह समझा',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    findMatchingSchemes: 'मिलती-जुलती योजनाएं खोजें',
    notProvided: 'नहीं बताया',
    privacyNote: 'आपकी प्रोफ़ाइल का उपयोग प्रासंगिक योजनाओं की पहचान के लिए किया जाता है। कृपया अनावश्यक संवेदनशील जानकारी साझा न करें।',

    // Profile fields
    age: 'आयु',
    gender: 'लिंग',
    state: 'राज्य',
    city: 'शहर / जिला',
    income: 'पारिवारिक आय',
    occupation: 'व्यवसाय',
    education: 'शिक्षा',
    category: 'श्रेणी',
    disability: 'विकलांगता',
    interests: 'रुचियाँ',

    // Results
    schemesFound: 'योजनाएं मिलीं',
    editProfileLink: 'प्रोफ़ाइल बदलें',
    searchPlaceholder: 'योजना का नाम, श्रेणी या कीवर्ड खोजें...',
    all: 'सभी',
    centralGovt: 'केंद्र सरकार',
    stateGovt: 'राज्य सरकार',
    viewDetails: 'विवरण देखें',
    officialWebsite: 'आधिकारिक वेबसाइट',
    matchesYourProfile: 'आपकी प्रोफ़ाइल से मेल खाता है',
    relevantProfile: 'आपकी प्रोफ़ाइल के आधार पर प्रासंगिक',
    verifyEligibility: 'पात्रता जांचें',
    loadMore: 'और योजनाएं लोड करें',
    noResults: 'आपकी खोज से मेल खाने वाली कोई योजना नहीं मिली।',
    basedOnProfile: 'आपकी दी गई प्रोफ़ाइल के आधार पर, हमें प्रासंगिक सरकारी योजनाएं मिली हैं।',
    disclaimer: 'SchemeFinder योजना खोज और सूचनात्मक मार्गदर्शन प्रदान करता है। प्रोफ़ाइल मिलान पात्रता या अनुमोदन की गारंटी नहीं देता। कृपया आधिकारिक सरकारी वेबसाइट पर नवीनतम पात्रता आवश्यकताओं की जांच करें।',

    // SchemeDetail
    overview: 'अवलोकन',
    benefits: 'लाभ',
    eligibility: 'पात्रता',
    yourProfileMatch: 'आपकी प्रोफ़ाइल मिलान',
    officialSource: 'आधिकारिक स्रोत',
    applyOnWebsite: 'आधिकारिक वेबसाइट पर आवेदन करें',
    viewOfficialSource: 'आधिकारिक स्रोत देखें',
    lastVerified: 'अंतिम सत्यापित',
    matchNote: 'यह योजना प्रदान की गई जानकारी के आधार पर प्रासंगिक प्रतीत होती है। अंतिम पात्रता संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है।',

    // Categories
    categoriesTitle: 'श्रेणी के अनुसार देखें',
    categoriesSubtitle: 'सभी प्रमुख श्रेणियों में सरकारी योजनाएं देखें।',

    // FAQ
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    faqSubtitle: 'SchemeFinder और सरकारी योजनाओं के बारे में सामान्य प्रश्न।',

    // Footer
    footerDesc: 'नागरिकों को सरकारी योजनाओं, लाभों और वित्तीय सहायता को सरल और स्पष्ट रूप से खोजने में मदद करना।',
    officialSources: 'जानकारी आधिकारिक सरकारी पोर्टलों से ली गई है',
    footerDisclaimer: 'SchemeFinder एक सूचनात्मक खोज उपकरण है। किसी भी सरकारी योजना के लिए अंतिम पात्रता संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है। हमेशा आधिकारिक स्रोतों से सत्यापित करें।',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
