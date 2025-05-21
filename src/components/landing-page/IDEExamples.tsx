import React, { useEffect, useState } from "react";
import sdk from "@stackblitz/sdk";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "@heroui/react";
import { Image } from "expo-image";
import ExpoLogo from "@/assets/images/expo-logo.png"
import NextLogo from "@/assets/images/next.svg";
import TranslateSheet from "translate-sheet";

type IDEInfo = { key: string; openFile: string };

// const vueIDEInfo: IDEInfo = {
//   key: "vitejs-vite-vjnhrzki",
//   openFile: "src/App.vue",
// };
const nextIDEInfo: IDEInfo = {
  key: 'stackblitz-starters-inixmsbj',
  openFile: "app/page.tsx",
};

const expoIDEInfo: IDEInfo = {
  key: "translatesheet-expo-example-cpjulyut",
  openFile: "app/(tabs)/index.tsx",
};

const IDEExamples = () => {
  const [ideToShow, setIdeToShow] = useState<"expo" | "next" | "vue">("expo");

  useEffect(() => {
    const containerId = "IDEContainer";

    const IDEInfo: IDEInfo = ideToShow === "expo" ? expoIDEInfo : nextIDEInfo;

    sdk.embedProjectId(containerId, IDEInfo.key, {
      forceEmbedLayout: true,
      openFile: IDEInfo.openFile,
      height: 500,
      hideNavigation: true,
    });
  }, [ideToShow]);

  return (
    <View style={{ paddingHorizontal: 32, width: "100%", height: 800 }}>
      <View style={styles.textWrapper}>
        <Text style={styles.heading}>{translations.heading}</Text>
        <Text style={styles.subHeadingText}>{translations.subHeading}</Text>
      </View>
      <View style={styles.IDEOptionsContainer}>
        <Button
          size="sm"
          radius="full"
          onPress={() => setIdeToShow("expo")}
          style={
            ideToShow === "expo" ? styles.selectedButton : styles.languageButton
          }
        >
          <Image style={styles.image} source={ExpoLogo} contentFit="contain" />
        </Button>
        <Button
          size="sm"
          radius="full"
          onPress={() => setIdeToShow("next")}
          style={
            ideToShow === "next" ? styles.selectedButton : styles.languageButton
          }
        >
          <Image source={NextLogo as unknown as number} style={styles.image} contentFit="contain" />
        </Button>
      </View>
      <View id="IDEContainer" />
    </View>
  );
};

export default IDEExamples;

const translations = TranslateSheet.create("IDEExamples", {
  heading: "Take it for a spin!",
  subHeading:
    "With a single config file, you're ready to start using TranslateSheet in your project!",
});

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Inter",
    color: "black",
    letterSpacing: -1,
    fontWeight: "400",
    fontSize: 37,
    marginBottom: 8,
  },
  subHeadingText: {
    fontFamily: "Inter",
    textAlign: "center", // Equivalent to `text-start`
    color: "#575757", // Approximate Tailwind `text-default-500`
    fontSize: 18, // Approximate Tailwind `text-base`
  },
  textWrapper: {
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  IDEOptionsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 32,
    paddingBottom: 32,
  },
  languageButton: {
    borderWidth: 1,
    borderColor: "#2C9A66",
    backgroundColor: "#E6F6EB",
    paddingHorizontal: 18,
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 20,
    color: "#2C9A66",
    width: 180,
    height: 50,
  },
  selectedButton: {
    borderWidth: 1,
    borderColor: "#008DDF",
    backgroundColor: "#dbf4ff",
    paddingHorizontal: 18,
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 20,
    color: "#008DDF",
    width: 180,
    height: 50,
  },
  image: {
    width: "60%",
    height: "100%", // or a fixed value, e.g., 50
    // resizeMode: "cover", // or "cover", based on your desired effect
  },
});
