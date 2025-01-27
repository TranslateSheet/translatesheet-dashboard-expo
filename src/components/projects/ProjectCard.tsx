import React from "react";
import { Card, CardBody } from "@heroui/react";
import { useRouter } from "expo-router";

const ProjectCard = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <Card
      onPress={() => router.push("/(app)/project")}
      isPressable
      className={"border-small"}
      shadow="sm"
    >
      <CardBody className="flex h-20 flex-row items-start gap-3 p-4">
        <div className="flex flex-col">
          <p className="text-medium">{title}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
