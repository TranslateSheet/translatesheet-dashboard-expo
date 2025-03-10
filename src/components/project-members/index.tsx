import type { CardProps } from "@heroui/react";
import React from "react";
import { Card, CardBody, Button, CardFooter, Divider } from "@heroui/react";

import { UserCell } from "./UserCell";
import { useGetProjectMembers } from "@/api/useGetProjectMembers";

export function ProjectMembers(props: CardProps) {
  const { data: members, isLoading, error } = useGetProjectMembers();

  console.log(members);

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
                  member.profile?.avatar_url ||
                  "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
                name={
                  member.profile?.full_name ||
                  member.profile?.email ||
                  "unknown user"
                }
                permission={member.role || "viewer"}
                invitationPending={!member.user_id}
              />
              {members.length > 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </CardBody>
      {/* <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="flat">
          Copy Link
        </Button>
        <Button size="sm" variant="flat">
          Get Embed Code
        </Button>
      </CardFooter> */}
    </Card>
  );
}
