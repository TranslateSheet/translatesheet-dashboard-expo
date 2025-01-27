import { View, StyleSheet } from "react-native";
import React from "react";
import PageHeader from "@/components/PageHeader";

export default function APIKeysScreen() {
  return (
    <View style={styles.container}>
      <PageHeader
        heading="API Keys"
        subHeading="Manage your API keys"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 42 },
});
