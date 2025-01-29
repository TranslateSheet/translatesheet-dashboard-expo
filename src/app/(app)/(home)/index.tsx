import { View, Text } from "react-native";
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Spacer } from "@heroui/react";
import { Projects } from "@/components/projects";
import { NewProjectModal } from "@/components/projects/NewProjectModal";

const ProjectsScreen = () => {
  return (
    <PageContainer>
      <PageHeader
        heading="Projects"
        subHeading="Manage your projects"
        headerRight={<NewProjectModal />}
      />
      <Spacer y={4} />
      <Projects />
    </PageContainer>
  );
};

export default ProjectsScreen;
