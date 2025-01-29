import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { PageContainer } from "@/components/PageContainer";
import { Spacer } from "@heroui/react";
import { PricingPlans } from "@/components/billing/PricingPlans";

export default function BillingScreen() {
  return (
    <PageContainer>
      {/* <PageHeader
        heading="Billing"
        subHeading="Add or update your billing information"
      /> */}
      <Spacer y={4} />
      <PricingPlans />
    </PageContainer>
  );
}
