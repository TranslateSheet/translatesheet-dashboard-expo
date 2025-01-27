import { View, StyleSheet } from "react-native";
import React from "react";
import PageHeader from "@/components/PageHeader";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <PageHeader
        heading="Home Screen"
        subHeading="This page is a WIP"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 42 },
});
