import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Tooltip } from "@heroui/react";

type Props = {};

const ColumnLabelTooltip = ({
  children,
  description,
}: {
  children: ReactNode;
  description: string;
}) => {
  return (
    <Tooltip
      delay={500}
      showArrow
      placement="top-start"
      content={
        <div className="px-1 py-2 w-60">
          <div className="text-small">{description}</div>
        </div>
      }
    >
      {children}
    </Tooltip>
  );
};

export default ColumnLabelTooltip;
