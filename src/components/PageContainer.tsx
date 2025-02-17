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
      style={{ flex: 1 }}
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
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
