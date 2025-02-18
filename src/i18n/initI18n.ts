import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resources";

export const fallbackLocale = "en-US";
const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

const supportedTags = Object.keys(resources);

const systemTagMatchesSupportedTags = (browserTag: string) => {
  const primaryTag = browserTag.split("-")[0];
  return supportedTags.includes(primaryTag);
};

const getInitialLocale = () => {
  if (typeof window === "undefined") return fallbackLocale;

  const browserLocales = navigator.languages || [navigator.language];
  const matchedLocale = browserLocales.find((locale) =>
    systemTagMatchesSupportedTags(locale)
  );

  return matchedLocale || fallbackLocale;
};

export const lng = getInitialLocale();

console.log({ lng });
export const isRTL = RTL_LANGUAGES.includes(lng.split("-")[0]);

if (typeof document !== "undefined") {
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
}

export const initI18n = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  console.log(`[initI18n] i18n initialized with language: ${i18n.language}`);
};

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    const isRTL = RTL_LANGUAGES.includes(lng.split("-")[0]);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }
});
