import { View, StyleSheet, ScrollView } from "react-native";
import React, { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    padding: 42,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems:"center"
  },
});
