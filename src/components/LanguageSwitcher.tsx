import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="language-switcher" role="group" aria-label={t('language')}>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={i18n.resolvedLanguage === code}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
