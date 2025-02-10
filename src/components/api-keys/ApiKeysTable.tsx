import useGetProjectApiKeys from "@/api/useGetProjectApiKeys";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { MoreVertical } from "lucide-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import ColumnLabelTooltip from "../translations/TranslationsTable/ColumnLabelTooltip";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "KEY", uid: "key" },
  { name: "CREATED AT", uid: "created_at" },
  { name: "LAST USED AT", uid: "last_used_at" },
  { name: "STATUS", uid: "is_active" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "warning",
  disabled: "danger",
};

export function ApiKeysTable() {
  const { apiKeys, loading: apiKeysLoading, error } = useGetProjectApiKeys();

  // TODO: this will eventually come from the hook^ when we have multiple keys per project
  // const realTokens = [
  //   apiKey && {
  //     name: apiKey.name,
  //     id: apiKey.id,
  //     secretKey: apiKey.key,
  //     created: format(new Date(apiKey.created_at), "MMM d, yyyy"),
  //     lastUsed: apiKey.last_used_at
  //       ? format(new Date(apiKey.last_used_at), "MMM d, yyyy")
  //       : "-",
  //     status: apiKey.is_active ? "active" : "disabled",
  //   },
  // ];

  const renderCell = React.useCallback(
    ({ token, columnKey }: { token: any; columnKey: any }) => {
      const cellValue = token[columnKey];

      switch (columnKey) {
        case "name":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "key":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "last_used_at":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "created_at":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "status":
          return (
            <Chip
              className="capitalize"
              // @ts-ignore
              color={statusColorMap[token.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <View style={styles.actionsContainer}>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MoreVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="view">View</DropdownItem>
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem key="delete">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </View>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            <ColumnLabelTooltip description="testinggg">
              {column.name}
            </ColumnLabelTooltip>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={apiKeysLoading ? "loading..." : "No rows to display."}
        items={apiKeys}
      >
        {(item) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell({ token: item, columnKey })}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    // "relative flex justify-center items-center gap-2"
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});
