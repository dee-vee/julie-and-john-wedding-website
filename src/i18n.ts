import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './locales/en.json';
import chinese from './locales/zh-Hans.json';

const preferenceKey = 'wedding-language';
export const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh-Hans', label: '简体中文' },
];

function readPreference() {
  try {
    const saved = localStorage.getItem(preferenceKey);
    return languages.find(({ code }) => code === saved)?.code ?? 'en';
  } catch {
    return 'en';
  }
}

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  try {
    localStorage.setItem(preferenceKey, language);
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
});

export const translationsReady = i18n.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    'zh-Hans': { translation: chinese },
  },
  lng: readPreference(),
  fallbackLng: 'en',
  supportedLngs: languages.map(({ code }) => code),
  interpolation: { escapeValue: false },
});
