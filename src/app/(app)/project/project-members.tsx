
import React from "react";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import { Spacer } from "@heroui/react";
import ProjectMembers from "@/components/project-members"

const ProjectMembersScreen = () => {
  return (
    <PageContainer>
      <PageHeader
        heading="Project Members"
        subHeading="Manage your project members"
      />
      <Spacer y={4}/>
      <ProjectMembers/>
    </PageContainer>
  );
};

export default ProjectMembersScreen;
