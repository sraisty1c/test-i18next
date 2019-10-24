import { getMyBirthday } from './util';
// import i18next from '../../test-helpers/i18nTestEs';
import i18next from '../i18n';

describe('Regular TS function', () => {
  beforeEach(() => {
    i18next.changeLanguage('es');
  });

  it('Returns bday in Spanish format', () => {
    const bday = getMyBirthday('sue');
    console.log(bday);
    expect(bday).toEqual('1980/08/05');
  });
  afterEach(() => {
    i18next.changeLanguage('en');
  });
});
