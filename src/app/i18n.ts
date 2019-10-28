import { initReactI18next } from 'react-i18next'
import { appStrings } from '../../assets/i18n/appStrings.json'

// 1. With following line, the webapp works but tests fail with type error
import i18n from 'i18next'

// 2. With the following line, tests pass but webapp fails in browser with type error
// import * as i18n from 'i18next';

// 3. With the next 3 lines, tests pass but webapp fails in browser
// import * as i18nextDefault from 'i18next';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const i18n: typeof i18nextDefault = require('i18next');

i18n.use(initReactI18next).init(
  {
    debug: true,
    resources: appStrings,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translation', 'help', 'settings'],
  },
  (err: Error, t: i18n.TFunction) => {
    if (err) {
      console.error(`i18Next initialization error: ${err.message}`)
    } else {
      console.log(`i18N initialized. Language: ${t('langCode')}`)
    }
  },
)

export default i18n
