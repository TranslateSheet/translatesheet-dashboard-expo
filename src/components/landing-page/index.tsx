import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import BasicNavbar from "./basic-navbar";
import Banner from "./banner";
import { useRouter } from "expo-router";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import TerminalSim from "./terminal-sim";
import TranslateSheet from "translate-sheet";
import LanguageOptions from "./language-options";

export default function LandingPage() {
  const [enabledLanguages, setEnabledLanguages] = useState<string[]>([]);

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const handleFileGenerated = (lang: string) => {
    setEnabledLanguages((prev) => [...prev, lang]);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <Banner />
      <BasicNavbar />
      <View
        style={[
          styles.contentContainer,
          {
            flexDirection: windowWidth > 1024 ? "row" : "column",
            paddingTop: windowWidth > 1216 ? 100 : 42,
            paddingLeft: windowWidth > 1216 ? 48 : 28,
            paddingRight: windowWidth > 1216 ? 48 : 28,
            gap: windowWidth > 1216 ? 100 : 60,
          },
        ]}
      >
        <View
          style={[
            styles.leftWrap,
            {
              // flex:1,
              maxWidth: windowWidth > 1216 ? "50%" : "100%",
            },
          ]}
        >
          <Button
            as="a"
            style={styles.headingButton}
            endContent={
              <Icon
                style={styles.icon}
                icon="solar:arrow-right-linear"
                width={20}
              />
            }
            size="sm"
            radius="full"
            variant="bordered"
            href="https://x.com/bran_aust/status/1886818436346478625"
            target="_blank"
          >
            {translations.ctaButtonLabel}
          </Button>
          <LazyMotion features={domAnimation}>
            <m.div
              animate="kick"
              className="flex flex-col gap-6"
              exit="auto"
              initial="auto"
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              variants={{
                auto: { width: "auto" },
                kick: { width: "auto" },
              }}
            >
              <AnimatePresence mode="wait">
                <m.div
                  animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                  className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]"
                  initial={{
                    filter: "blur(16px)",
                    opacity: 0,
                    x: 15 + 1 * 2,
                  }}
                  transition={{
                    bounce: 0,
                    delay: 0.01 * 10,
                    duration: 0.8 + 0.1 * 8,
                    type: "spring",
                  }}
                >
                  <ResponsiveHeading />
                </m.div>

                <m.p
                  animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                  style={
                    windowWidth > 1024
                      ? styles.subHeadingText
                      : styles.subHeadingTextMobile
                  }
                  initial={{
                    filter: "blur(16px)",
                    opacity: 0,
                    x: 15 + 1 * 3,
                  }}
                  transition={{
                    bounce: 0,
                    delay: 0.01 * 30,
                    duration: 0.8 + 0.1 * 9,
                    type: "spring",
                  }}
                >
                  {translations.subHeading}
                </m.p>

                <m.div
                  animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
                  initial={{
                    filter: "blur(16px)",
                    opacity: 0,
                    x: 15 + 1 * 4,
                  }}
                  transition={{
                    bounce: 0,
                    delay: 0.01 * 50,
                    duration: 0.8 + 0.1 * 10,
                    type: "spring",
                  }}
                  style={{ paddingTop: 48, flexDirection: "row" }}
                >
                  <Button
                    className="h-14 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
                    radius="md"
                    onPress={() => router.push("/dashboard")}
                  >
                    {translations.getStarted}
                  </Button>
                  <Button
                    className="h-14 w-[163px] border-3 border-default-200 px-[16px] py-[10px] text-small font-medium leading-5"
                    endContent={
                      <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                        <Icon
                          className="text-default-500 [&>path]:stroke-[1.5]"
                          icon="solar:arrow-right-linear"
                          width={16}
                        />
                      </span>
                    }
                    radius="md"
                    variant="bordered"
                    onPress={() =>
                      router.push("https://docs.translatesheet.co")
                    }
                  >
                    {translations.readTheDocs}
                  </Button>
                </m.div>
              </AnimatePresence>
            </m.div>
          </LazyMotion>
        </View>

        <View style={styles.rightWrap}>
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <m.div
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                initial={{ filter: "blur(16px)", opacity: 0, y: 30 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.8,
                }}
              >
                {windowWidth > 1024 && (
                  <>
                    <LanguageOptions enabledLanguages={enabledLanguages} />
                    <TerminalSim onFileGenerated={handleFileGenerated} />
                  </>
                )}
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1200,
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  leftWrap: {
    flexShrink: 1,
    gap: 32,
    alignSelf: "flex-start",
  },
  rightWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    pointerEvents: "none", // Equivalent to `pointer-events-none`
    position: "absolute", // Equivalent to `absolute`
    top: "-25%", // Equivalent to `top-[-25%]`
    left: 0, // Equivalent to `inset-0` (left and right set to 0)
    right: 0,
    bottom: 0,
    zIndex: 10, // Equivalent to `z-10`
    transform: [{ scale: 1.5 }], // Equivalent to `scale-150`
    userSelect: "none", // Equivalent to `select-none`
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    zIndex: -10,
    position: "absolute",
  },
  headingButton: {
    fontFamily: "Inter",
    borderWidth: 1, // Equivalent to `border-1`
    borderColor: "#008DDF", // Approximate Tailwind `border-default-100`
    backgroundColor: "#dbf4ff", // Approximate Tailwind `bg-default-50`
    paddingHorizontal: 18, // Equivalent to `px-[18px]`
    fontSize: 14, // Approximate Tailwind `text-small`
    fontWeight: "400", // Equivalent to `font-normal`
    lineHeight: 20, // Approximate Tailwind `leading-5`
    color: "#008DDF", // Approximate Tailwind `text-default-500`
    maxWidth: 200, // Equivalent to `max-w-[200px]`
  },
  icon: {
    flex: 1, // Equivalent to `flex-none`
    textAlign: "center", // Keeps it centered
  },
  animatedTextWrapper: {
    textAlign: "left", // Equivalent to `text-start`
  },
  animatedText: {
    fontSize: 44, // Approximate max of `clamp(40px,10vw,44px)`
    fontWeight: "bold", // Equivalent to `font-bold`
    lineHeight: 52, // Approximate `leading-[1.2]`
    letterSpacing: -1, // Equivalent to `tracking-tighter`
    color: "white", // Default light mode color
  },
  heading: {
    fontFamily: "Inter",
    color: "black",
    lineHeight: 1.5,
    letterSpacing: -1,
    fontWeight: "400",
    maxWidth: 500,
    fontSize: 37,
  },
  headingMobile: {
    fontFamily: "Inter",
    color: "black",
    lineHeight: 1.5,
    letterSpacing: -1,
    fontWeight: "400",
    maxWidth: 360,
    fontSize: 28,
  },
  subHeadingText: {
    fontFamily: "Inter",
    textAlign: "left", // Equivalent to `text-start`
    color: "#575757", // Approximate Tailwind `text-default-500`
    fontSize: 18, // Approximate Tailwind `text-base`
    maxWidth: 570,
  },
  subHeadingTextMobile: {
    fontFamily: "Inter",
    textAlign: "left", // Equivalent to `text-start`
    fontWeight: "400", // Equivalent to `font-normal`
    color: "#575757", // Approximate Tailwind `text-default-500`
    fontSize: 18, // Approximate Tailwind `text-base`
    maxWidth: 400,
  },
});

export function ResponsiveHeading() {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <m.div
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      initial={{ opacity: 0, x: 17, filter: "blur(16px)" }}
      transition={{
        bounce: 0,
        delay: 0.1,
        duration: 1.6,
        type: "spring",
      }}
      style={{ textAlign: "left" }}
    >
      <div
        style={
          windowWidth > 660
            ? { ...styles.heading }
            : { ...styles.headingMobile }
        }
      >
        {translations.translateSheetHelpsYou}{" "}
        <div style={{ display: "inline" }}>
          <p
            style={{
              textDecorationLine: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "#008DDF",
              display: "inline",
            }}
          >
            {translations.define}
          </p>{" "}
          <p
            style={{
              textDecorationLine: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "#EF5E01",
              display: "inline",
            }}
          >
            {translations.generate}
          </p>{" "}
          &{" "}
          <p
            style={{
              textDecorationLine: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "#2C9A66",
              display: "inline",
            }}
          >
            {translations.manage}
          </p>
        </div>{" "}
        {translations.simpleAPI}
      </div>
    </m.div>
  );
}

const translations = TranslateSheet.create("ResponsiveHeading", {
  translateSheetHelpsYou: "TranslateSheet helps you",
  define: "define",
  generate: "generate",
  manage: "manage",
  simpleAPI: "translations with a simple API",
  ctaButtonLabel: "Learn what's new!",
  subHeading:
    "Build multilingual apps with React and React Native. Automate translation file generation and simplify localization from day one.",
  getStarted: "Get Started",
  readTheDocs: "Read the Docs",
});
