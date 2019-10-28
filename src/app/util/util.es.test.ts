import { getMyBirthday } from './util';
import i18next from '../i18n';

describe('Regular TS function', () => {
  const oldLang = i18next.language;

  beforeEach(() => {
    i18next.changeLanguage('es');
  });

  it('Returns bday in Spanish format', () => {
    const bday = getMyBirthday('sueBday');
    console.log(bday);
    expect(bday).toEqual('5 de agosto de 1985');
  });
  afterEach(() => {
    i18next.changeLanguage(oldLang);
  });
});
