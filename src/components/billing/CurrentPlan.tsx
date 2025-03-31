import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Card, Spacer } from "@heroui/react";
import { ThemedText } from "../ThemedText";
import { Icon } from "@iconify/react";
import useSubscriptionStatus from "@/api/useSubscriptionStatus";

const CurrentPlan = () => {
  const {
    loading,
    isActive: subscriptionIsActive,
    subscriptionStatus,
  } = useSubscriptionStatus();

  console.log({ subscriptionStatus });

  if (loading) return <></>;

  return (
    <Card style={styles.sectionContainer}>
      <ThemedText type="subtitle">Current Plan</ThemedText>
      <Spacer y={6} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <ThemedText type="defaultSemiBold">
            {subscriptionIsActive ? "Professional" : "be"}
          </ThemedText>
          <Text>
            For small teams and early-stage startups.
            <Link
              style={{ color: "#016fee" }}
              href="/dashboard/billing/update-plan"
            >
              Plan Benefits →
            </Link>
          </Text>
          {subscriptionStatus == "cancelled" && (
            <Text>Subscription cancelled</Text>
          )}
        </View>
        <Link href="/dashboard/billing/update-plan">
          <View style={styles.updatePlanWrap}>
            <Icon icon="solar:pen-broken" />
            Update Plan
          </View>
        </Link>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    width: "100%",
    paddingRight: 48,
  },
  updatePlanWrap: {
    flexDirection: "row",
    gap: 4,
    fontWeight: "500",
  },
});

export default CurrentPlan;
