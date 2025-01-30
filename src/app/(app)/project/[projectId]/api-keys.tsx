import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { NewApiKeyModal } from "@/components/api-keys/NewApiKeyModal";
import { PageContainer } from "@/components/PageContainer";
import { Spacer } from "@heroui/react";
import { ApiKeysTable } from "@/components/api-keys/ApiKeysTable";

export default function APIKeysScreen() {
  return (
    <PageContainer>
      <PageHeader
        heading="API Keys"
        subHeading="Manage your API keys"
        headerRight={<NewApiKeyModal />}
      />
      <Spacer y={4} />
      <ApiKeysTable />
    </PageContainer>
  );
}
