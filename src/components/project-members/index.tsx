import type { CardProps } from "@heroui/react";
import React from "react";
import { Card, CardBody, Button, CardFooter, Divider } from "@heroui/react";

import { UserCell } from "./UserCell";
import { useGetProjectMembers } from "@/api/useGetProjectMembers";


export function ProjectMembers(props: CardProps) {
  const { data: members, isLoading, error } = useGetProjectMembers();

  console.log(members)


  if (isLoading) {
    return <div>Loading project members...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (members?.length === 0) {
    return <div>No project members found.</div>;
  }

  return (
    <Card className="w-full" {...props}>
      <CardBody>
        <div className="mt-2 flex flex-col gap-2">
          {members?.map((member) => (
            <React.Fragment key={member.id}>
              <UserCell
                avatar={
                  member.profile?.avatar_url || "https://i.pravatar.cc/150?u=default"
                }
                name={member.profile?.full_name || "Unknown User"}
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
