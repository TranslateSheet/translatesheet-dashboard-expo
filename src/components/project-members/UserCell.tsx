// https://www.heroui.pro/components/application/cards

import React from "react";
import { Avatar, cn } from "@heroui/react";

import { CellWrapper } from "./CellWrapper";

export type UserCellProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar: string;
  name: string;
  invitationPending: boolean;
  permission: string;
};

const UserCell = React.forwardRef<HTMLDivElement, UserCellProps>(
  (
    { avatar, name, invitationPending, permission, className, ...props },
    ref
  ) => (
    <CellWrapper
      ref={ref}
      className={cn("bg-transparent px-3 py-1", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Avatar size="sm" src={avatar} />
        <p className="text-small text-default-500 pr-5">{name}</p>
        {invitationPending && (
          <p
            style={{ fontStyle: "italic", fontSize: 12 }}
            className="text-default-500"
          >
            -- invitation pending --
          </p>
        )}
      </div>
      <p className="text-small text-default-400">{permission}</p>
    </CellWrapper>
  )
);

UserCell.displayName = "UserCell";

export { UserCell };
