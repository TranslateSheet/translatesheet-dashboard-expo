"use client";

import React, { ReactNode } from "react";
import { ThemedText } from "./ThemedText";
import { View } from "react-native";
import { Link } from "expo-router";

export function PageHeader({
  heading,
  subHeading,
  headerRight,
  navBackPage,
}: {
  heading: string;
  subHeading?: string;
  headerRight?: ReactNode;
  navBackPage?: string;
}) {
  return (
    <View style={styles.header}>
      <View>
      {/* <Link href={navBackPage} lightColor="#777777">go back</Link> */}
      <View style={styles.textContainer}>
        <ThemedText type="title">{heading}</ThemedText>
        <ThemedText lightColor="#777777">{subHeading}</ThemedText>
      </View>
      </View>
      {headerRight && headerRight}
    </View>
  );
}

// TODO: use StyleSheet
const styles = {
  header: {
    flexDirection: "row",
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
