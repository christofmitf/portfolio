/**
 * Buttons to switch between the languages, shown in the header.
 * The language names are always written in their own language, so a visitor
 * can find theirs even if they don't understand the current one.
 */

import { useTranslation } from 'react-i18next'
import useLanguage from '../hooks/useLanguage'
import { languages, type Language } from '../types/i18n'
import './LanguageSwitch.css'

const languageNames: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
}

function LanguageSwitch() {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="language-switch"
      role="group"
      aria-label={t('header.languageSwitch')}
    >
      {languages.map((option) => (
        <button
          key={option}
          lang={option}
          title={languageNames[option]}
          aria-pressed={option === language}
          className={
            option === language ? 'language-option active' : 'language-option'
          }
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitch
