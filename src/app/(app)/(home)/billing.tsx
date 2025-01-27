import React from "react";
import PageHeader from "@/components/PageHeader";
import PageContainer from "@/components/PageContainer";
import { Spacer } from "@heroui/react";
import { BillingPlanCard } from "@/components/billing/BillingPlanCard";

export default function BillingScreen() {
  return (
    <PageContainer>
      <PageHeader
        heading="Billing"
        subHeading="Add or update your billing information"
      />
      <Spacer y={4} />
      <BillingPlanCard />
    </PageContainer>
  );
}
