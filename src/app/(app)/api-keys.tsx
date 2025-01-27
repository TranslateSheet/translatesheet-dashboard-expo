import { View, StyleSheet } from "react-native";
import React from "react";
import PageHeader from "@/components/PageHeader";
import NewApiKeyModal from "@/components/api-keys/NewApiKeyModal";
import PageContainer from "@/components/PageContainer";

export default function APIKeysScreen() {
  return (
    <PageContainer>
      <PageHeader
        heading="API Keys"
        subHeading="Manage your API keys"
        headerRight={<NewApiKeyModal />}
      />
    </PageContainer>
  );
}
