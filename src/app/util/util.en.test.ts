import { getMyBirthday } from './util'
import i18next from '../i18n'

describe('Regular TS function', () => {
  const oldLang = i18next.language

  beforeEach(() => {
    i18next.changeLanguage('en')
  })

  it('Returns bday in US format', () => {
    const bday = getMyBirthday('sueBday')
    console.log(bday)
    expect(bday).toEqual('August 5, 1985')
  })

  beforeEach(() => {
    i18next.changeLanguage(oldLang)
  })
})
