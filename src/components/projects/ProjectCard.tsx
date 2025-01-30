import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Link, useRouter } from "expo-router";
import { Database } from "../../../lib/supabase/database.types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  return (
    <Card isPressable className={"border-small"} shadow="sm">
      <CardBody
        onClick={() =>
          router.push({
            pathname: "/project/[projectId]",
            params: { projectId: project.id },
          })
        }
        className="flex h-20 flex-row items-start gap-3 p-4"
      >
        <div className="flex flex-col">
          <p className="text-medium">{project.name}</p>
        </div>
      </CardBody>
    </Card>
  );
}
