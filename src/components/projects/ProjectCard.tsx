import React from "react";
import { Card, CardBody } from "@heroui/react";
import { useRouter } from "expo-router";
import { ProjectsRow } from "@/api/types";

export function ProjectCard({ project }: { project: ProjectsRow }) {
  const router = useRouter();
  return (
    <Card
      isPressable
      onPress={() =>
        router.push({
          pathname: "/dashboard/(app)/(home)/project/[projectId]",
          params: { projectId: project.id },
        })
      }
      className={"border-small"}
      shadow="sm"
    >
      <CardBody className="flex h-20 flex-row items-start gap-3 p-4">
        <div className="flex flex-col">
          <p className="text-medium">{project.name}</p>
        </div>
      </CardBody>
    </Card>
  );
}
