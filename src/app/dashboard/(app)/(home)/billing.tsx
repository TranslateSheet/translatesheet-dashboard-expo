import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { PageContainer } from "@/components/PageContainer";
import { Spacer } from "@heroui/react";
import { PricingPlans } from "@/components/billing/PricingPlans";

export default function UpdatePlanScreen() {
  return (
    <PageContainer>
      <PageHeader
        heading="Billing"
        subHeading="View and update your current plan and billing information"
      />
      <Spacer y={4} />
      <PricingPlans />
    </PageContainer>
  );
}
