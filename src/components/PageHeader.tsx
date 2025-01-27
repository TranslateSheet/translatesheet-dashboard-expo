"use client";

import React, { ReactNode } from "react";
import { ThemedText } from "./ThemedText";
import { View } from "react-native";

export function PageHeader({
  heading,
  subHeading,
  headerButton,
}: {
  heading: string;
  subHeading: string;
  headerButton?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <ThemedText type="title">{heading}</ThemedText>
        <ThemedText lightColor="#777777">{subHeading}</ThemedText>
      </View>
      {headerButton && headerButton}
    </View>
  );
}

const styles = {
  header: {
    marginBottom: 24,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  heading: {
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subHeading: {
    color: "#a3a3a3",
  },
} as const;

export default PageHeader;
