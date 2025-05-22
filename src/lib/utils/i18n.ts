import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko', // 언어 감지 실패 시 기본값
    debug: true,
    interpolation: {
      escapeValue: false, // React는 자동으로 escape 처리하므로 false
    },
    backend: {
      loadPath: '/locales/{{lng}}/sample.json', // public/locales 경로 사용
    },
  });

export default i18n;
