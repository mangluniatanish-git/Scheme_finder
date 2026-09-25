# 🇮🇳 SchemeFinder

> A personalized government scheme discovery platform that helps users find relevant Indian government schemes based on their personal profile and requirements.

## 📌 Overview

SchemeFinder is a web application designed to simplify the process of discovering government welfare schemes in India.

Finding the right government scheme can be difficult because users often have to search through large amounts of information and understand eligibility requirements themselves.

SchemeFinder addresses this problem by allowing users to create their profile in **English or Hindi** and automatically identifying government schemes that may be relevant to their profile.

Instead of manually searching through hundreds of schemes, users can provide their information once and receive a personalized list of potentially applicable schemes.

---

## ✨ Key Features

### 👤 Personalized Profile

Users can provide relevant information such as:

- Age
- Gender
- State
- District
- Annual family income
- Occupation
- Employment status
- Education level
- Social category
- Specific needs/interests

The profile information is used to identify schemes relevant to the user.

### 🌐 Bilingual Support

SchemeFinder supports both:

- 🇬🇧 English
- 🇮🇳 Hindi

Users can interact with the platform in their preferred language.

### 🔎 Personalized Scheme Discovery

Instead of browsing schemes manually, the platform filters schemes according to the user's profile and requirements.

This helps users discover schemes that may match their:

- Age group
- Income level
- Location
- Occupation
- Education
- Social category
- Specific needs

### 📋 Scheme Cards

Each scheme is presented in an easy-to-understand format containing relevant information such as:

- Scheme name
- Description
- Eligibility
- Benefits
- Required documents
- Application information
- Relevant categories

### 📄 Scheme Details

Users can open an individual scheme to view more detailed information before deciding whether to apply.

### 🤖 AI-Assisted Discovery

The project is designed to support AI-assisted scheme discovery, allowing user-provided profile information to be processed and used for more intelligent scheme recommendations.

### 📱 Responsive Interface

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM

### Development

- VS Code
- Git
- GitHub
- npm

### AI / Intelligent Processing

- AI-assisted profile analysis
- Scheme matching
- Natural-language profile processing

---

## 🏗️ Project Structure

```text
scheme-finder/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── FilterBar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroDashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileChips.jsx
│   │   └── SchemeCard.jsx
│   │
│   ├── context/
│   │   ├── LanguageContext.jsx
│   │   └── ProfileContext.jsx
│   │
│   ├── data/
│   │   └── schemes.js
│   │
│   ├── layout/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AllSchemes.jsx
│   │   ├── Assistant.jsx
│   │   ├── Categories.jsx
│   │   ├── FAQ.jsx
│   │   ├── FindSchemes.jsx
│   │   ├── Home.jsx
│   │   ├── Results.jsx
│   │   └── SchemeDetail.jsx
│   │
│   ├── utils/
│   │   ├── profileParser.js
│   │   └── schemeMatcher.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.js
└── README.md