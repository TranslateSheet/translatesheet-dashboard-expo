import type { CardProps } from "@heroui/react";
import React from "react";
import { Card, CardBody, Button, CardFooter, Divider } from "@heroui/react";

import { UserCell } from "./UserCell";

import useGetProjectMembers, {
  CombinedProjectMember,
} from "@/api/useGetProjectMembers";

export function ProjectMembers(props: CardProps) {
  const { combinedMembers, loading, error } = useGetProjectMembers();

  console.log({ combinedMembers });

  if (loading) {
    return <div>Loading project members...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (combinedMembers.length === 0) {
    return <div>No project members found.</div>;
  }

  return (
    <Card className="w-full" {...props}>
      <CardBody>
        <div className="mt-2 flex flex-col gap-2">
          {combinedMembers.map((member: CombinedProjectMember) => (
            <React.Fragment key={member.id}>
              <UserCell
                avatar={
                  member.avatar_url || "https://i.pravatar.cc/150?u=default"
                }
                name={member.full_name || "Unknown User"}
                permission={member.role || "Can view"}
              />
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="flat">
          Copy Link
        </Button>
        <Button size="sm" variant="flat">
          Get Embed Code
        </Button>
      </CardFooter>
    </Card>
  );
}
