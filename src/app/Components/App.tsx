import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { getMyBirthday } from '../util/util'

export type AppProps = {
  testMessage: string
}

const App: React.FC<AppProps> = ({ testMessage }) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  console.log(`The language is ${language}`)

  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng)
  }
  return (
    <>
      <h2>{testMessage}</h2>
      <p>Click the button to change the language below:</p>
      <button onClick={(): void => changeLanguage('es')} type="button">
        Español
      </button>
      <button onClick={(): void => changeLanguage('en')} type="button">
        English
      </button>
      <p id="welcomeTranslation">{t('welcome')}</p>
      <p id="bday">{getMyBirthday('sueBday')}</p>
    </>
  )
}

export default App
