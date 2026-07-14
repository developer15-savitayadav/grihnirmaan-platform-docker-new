import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";

const params = new URLSearchParams(window.location.search);
const urlLang = params.get("lang");

const selectedLanguage =
    urlLang || localStorage.getItem("language") || "en";

if (urlLang) {
    localStorage.setItem("language", urlLang);
}

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        hi: { translation: hi },
    },
    lng: selectedLanguage,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
