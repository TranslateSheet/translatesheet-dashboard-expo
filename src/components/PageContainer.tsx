import { View, StyleSheet } from "react-native";
import React, { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 42,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    maxWidth: 1024,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default PageContainer;
