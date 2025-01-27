import { View, StyleSheet } from "react-native";
import React from "react";
import PageHeader from "@/components/PageHeader";

export default function BillingScreen() {
  return (
    <View style={styles.container}>
      <PageHeader
        heading="Billing"
        subHeading="Add or update your billing information"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 42 },
});
