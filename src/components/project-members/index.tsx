// https://www.heroui.pro/components/application/cards

import type { CardProps, Selection } from "@heroui/react";

import React from "react";
import {
  Card,
  CardBody,
  Button,
  CardFooter,
  Divider,
} from "@heroui/react";

import { UserCell } from "./UserCell";

export function ProjectMembers(props: CardProps) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["can-view"])
  );

  const permissionLabels: Record<string, string> = {
    "can-view": "Can View",
    "can-edit": "Can Edit",
  };

  // Memoize the user list to avoid re-rendering when changing the selected keys
  const userList = React.useMemo(
    () => (
      <div className="mt-2 flex flex-col gap-2">
        <UserCell
          avatar="https://i.pravatar.cc/150?u=a04258114e29026708c"
          name="Tony Reichert (you)"
          permission="Owner"
        />
        <Divider />
        <UserCell
          avatar="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          name="John Doe"
          permission="Can edit"
        />
        <Divider />
        <UserCell
          avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          name="Jane Doe"
          permission="Can view"
        />
        <Divider />
        <UserCell
          avatar="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          name="John Smith"
          permission="Can view"
        />
      </div>
    ),
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("handleSubmit");
  };

  return (
    <Card className="w-full" {...props}>
      <CardBody>
        {userList}
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
