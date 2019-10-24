/* eslint-disable import/prefer-default-export */
import i18next from '../i18n';

export const getMyBirthday: (name: string) => string = name => {
  const translatedBday = i18next.t(name);
  return translatedBday;
};
