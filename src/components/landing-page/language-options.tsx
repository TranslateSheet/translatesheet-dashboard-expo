"use client";

import React, { useState } from "react";
import i18n from "i18next";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Dropdown } from "@heroui/react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

const RTL_LANGUAGES = ["ar", "he", "fa"];

type Locale = {
  flag: string;
  languageCode: string;
  languageTag: string;
  regionCode: string;
};

const locales: Locale[] = [
  { flag: "🇺🇸", languageCode: "en", languageTag: "en", regionCode: "US" },
  { flag: "🇪🇸", languageCode: "es", languageTag: "es", regionCode: "CO" },
  { flag: "🇯🇵", languageCode: "ja", languageTag: "ja", regionCode: "JP" },
  { flag: "🇦🇪", languageCode: "ar", languageTag: "ar", regionCode: "AR" },
  { flag: "🇷🇺", languageCode: "ru", languageTag: "ru", regionCode: "RU" },
  { flag: "🇨🇳", languageCode: "zh", languageTag: "zh", regionCode: "CN" },
];

const LanguageOptions = ({
  enabledLanguages,
}: {
  enabledLanguages: string[];
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language ?? "en"
  );

  const handleLanguageChange = async (languageTag: string) => {
    setSelectedLanguage(languageTag);
    await i18n.changeLanguage(languageTag);
    const primaryTag = languageTag.split("-")[0];
    document.documentElement.dir = RTL_LANGUAGES.includes(primaryTag)
      ? "rtl"
      : "ltr";
  };

  const selectedLocale = locales.find(
    (locale) => locale.languageTag === selectedLanguage
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ maxWidth: 450 }}
        horizontal
      >
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="popLayout">
            {locales.map((locale) => {
              const isEnabled = enabledLanguages.includes(locale.languageCode);

              return (
                <m.div
                  key={locale.languageTag}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={
                    isEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                  }
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.5,
                  }}
                  style={{
                    display: "inline-block",
                    marginBottom: 8,
                    marginTop: 8,
                    marginRight: 12,
                  }}
                >
                  <Button
                    size="sm"
                    radius="full"
                    onPress={() => handleLanguageChange(locale.languageTag)}
                    disabled={!isEnabled}
                    style={
                      locale === selectedLocale
                        ? styles.selected
                        : isEnabled
                        ? styles.languageButton
                        : styles.disabledButton
                    }
                  >
                    {locale.flag} {locale.languageCode}
                  </Button>
                </m.div>
              );
            })}
          </AnimatePresence>
        </LazyMotion>
      </ScrollView>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="popLayout">
          <m.div
            // key={locale.languageTag}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
            style={{ display: "inline-block", marginTop: "8px", marginLeft: "8px" }}
          >
            <Button
              size="sm"
              radius="full"
              onPress={() => {}}
              isIconOnly
              // disabled={!isEnabled}
              style={styles.addButton}
            >
              +
            </Button>
          </m.div>
          );
        </AnimatePresence>
      </LazyMotion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    // TODO: remove
    // justifyContent: "space-evenly",
    marginBottom: 6,
  },
  languageButton: {
    borderWidth: 1,
    borderColor: "#2C9A66",
    backgroundColor: "#E6F6EB",
    paddingHorizontal: 18,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#2C9A66",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#2C9A66",
    backgroundColor: "#E6F6EB",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#2C9A66",
  },
  selected: {
    borderWidth: 1, // Equivalent to border-1
    borderColor: "#008DDF", // Approximate Tailwind border-default-100
    backgroundColor: "#dbf4ff", // Approximate Tailwind bg-default-50
    paddingHorizontal: 18, // Equivalent to px-[18px]
    fontSize: 14, // Approximate Tailwind text-small
    fontWeight: "400", // Equivalent to font-normal
    lineHeight: 20, // Approximate Tailwind leading-5
    color: "#008DDF", // Approximate Tailwind text-default-500
    maxWidth: 200, // Equivalent to max-w-[200px]
  },
  disabledButton: {
    opacity: 0.3, // Dim the button when disabled
    pointerEvents: "none",
  },
});

export default LanguageOptions;
