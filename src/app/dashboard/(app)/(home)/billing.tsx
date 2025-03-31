import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { PageContainer } from "@/components/PageContainer";
import { Spacer } from "@heroui/react";
import { PricingPlans } from "@/components/billing/PricingPlans";
import { Text } from "react-native";

export default function UpdatePlanScreen() {
  return (
    <PageContainer>
      <PageHeader
        heading="Billing"
        subHeading="View and update your current plan and billing information"
      />
      <Spacer y={4} />
      {__DEV__ ? (
        <PricingPlans />
      ) : (
        <Text>
          Enjoy TranslateSheet for free while it's currently in beta 😁
        </Text>
      )}
    </PageContainer>
  );
}
