import useGetProjectApiKey from "@/api/useGetProjectApiKey";
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
//   import useGetProjectApiKey from 'api/useGetProjectApiKey';
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "SECRET KEY", uid: "secretKey" },
  { name: "CREATED", uid: "created" },
  { name: "LAST USED", uid: "lastUsed" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "warning",
  disabled: "danger",
};

export function ApiKeysTable() {
  const { apiKey, loading: apiKeysLoading, error } = useGetProjectApiKey();

  // TODO: this will eventually come from the hook^ when we have multiple keys per project
  const realTokens = [
    apiKey && {
      name: apiKey.name,
      id: apiKey.id,
      secretKey: apiKey.key,
      created: format(new Date(apiKey.created_at), "MMM d, yyyy"),
      lastUsed: apiKey.last_used_at
        ? format(new Date(apiKey.last_used_at), "MMM d, yyyy")
        : "-",
      status: apiKey.is_active ? "active" : "disabled",
    },
  ];

  const renderCell = React.useCallback(
    ({ token, columnKey }: { token: any; columnKey: any }) => {
      const cellValue = token[columnKey];

      switch (columnKey) {
        case "name":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "secretKey":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "lastUsed":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "created":
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
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={apiKeysLoading ? "loading..." : "No rows to display."}
        items={realTokens}
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
