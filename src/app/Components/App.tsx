import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { getMyBirthday } from '../util/util';

export type HelloProps = {
  compiler: string;
  framework: string;
  bundler: string;
};

const App: React.FC<HelloProps> = ({ compiler, framework, bundler }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  console.log(`The language is ${language}`);

  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <h2>
        This is a YOW {framework} application using the {compiler} compiler with the {bundler}
        bundler.
      </h2>
      <p>Here is a REALLY AWESOME translated welcome message:</p>
      <button onClick={(): void => changeLanguage('es')} type="button">
        Espanol
      </button>
      <button onClick={(): void => changeLanguage('en')} type="button">
        English
      </button>
      <p id="welcomeTranslation">{t('welcome')}</p>
      <p id="bday">{getMyBirthday('sue')}</p>
    </>
  );
};

export default App;
