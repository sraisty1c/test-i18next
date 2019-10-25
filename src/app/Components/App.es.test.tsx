import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
// import i18nextEsTest from '../../test-helpers/i18nTestEs';
import App from './App';
import { appStrings } from '../../../assets/i18n/appStrings.json';
import i18next from '../i18n';

const welcomeInEspanol = appStrings.es.translation.welcome;

let wrapper: ReactWrapper<React.FC>;

describe('App renders with i18n library in Spanish', () => {
  it('renders in Spanish', () => {
    i18next.changeLanguage('es');
    wrapper = mount(
      <I18nextProvider i18n={i18next}>
        <App compiler="typescript" bundler="webpack" framework="react" />
      </I18nextProvider>,
    );
    console.log(wrapper.debug());
    expect(wrapper.find('p#welcomeTranslation')).toIncludeText(welcomeInEspanol);
  });
});
