import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { padding: windowWidth > 1216 ? 48 : 28 },
      ]}
    >
      <View style={styles.contentWrapper}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
