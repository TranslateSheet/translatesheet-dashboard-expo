import TranslateSheet from "translate-sheet";

export type Feature = {
  title: string;
  description: string;
  titleColor: string;
};

const useSpotlightCardFeatures = () => {
  const features: Feature[] = [
    {
      title: `🧱 ${translations.title1}`,
      description: translations.description1,
      titleColor: "#008DDF",
    },
    {
      title: `⚡ ${translations.title2}`,
      description: translations.description2,
      titleColor: "#EF5E01",
    },
    {
      title: `🛠️ ${translations.title3}`,
      description: translations.description3,
      titleColor: "#2C9A66",
    },
  ];

  return features;
};

const translations = TranslateSheet.create("features", {
  title1: "Define",
  description1:
    "Define your app's text exactly where it's used. TranslateSheet lets you co-locate translations with your components using simple, type-safe objects. No more jumping between files or guessing what keys exist.",
  title2: "Generate",
  description2:
    "Run a single command and TranslateSheet will auto-generate translations for every key across your project — even interpolated ones. Use AI-powered translations or integrate your own team.",
  title3: "Manage",
  description3:
    "Manage all your app's text in one place with the TranslateSheet Dashboard. Hire translators, review changes, and sync directly to your repo with GitHub integration.",
});

export default useSpotlightCardFeatures;
