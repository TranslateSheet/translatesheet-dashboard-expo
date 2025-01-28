import React from "react";
import PageHeader from "@/components/PageHeader";
import PageContainer from "@/components/PageContainer";
import { TranslationsTable } from "@/components/translations/TranslationsTable";
import { Spacer } from "@heroui/react";
import { UpdateTranslationsButton } from "@/components/translations/UpdateTranslationsButton";

export default function ProjectHome() {
  return (
    <PageContainer>
      <PageHeader
        heading="Translation Dashboard"
        subHeading="Manage your apps translations"
        headerRight={<UpdateTranslationsButton />}
      />
      <Spacer y={4} />
      <TranslationsTable />
    </PageContainer>
  );
}
