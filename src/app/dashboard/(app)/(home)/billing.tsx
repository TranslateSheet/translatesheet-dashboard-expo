import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { PageContainer } from "@/components/PageContainer";
import { Spacer } from "@heroui/react";
import { PricingPlans } from "@/components/billing/PricingPlans";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function BillingScreen() {
  return (
    <PageContainer>
      <PageHeader
        heading="Billing"
        subHeading="Add or update your billing information"
      />
      {/* <Spacer y={4} />
      <PricingPlans /> */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText fontWeight="600">
          TranslateSheet is currently free while in beta. Enjoy and please leave
          feedback :)
        </ThemedText>
      </View>
    </PageContainer>
  );
}
