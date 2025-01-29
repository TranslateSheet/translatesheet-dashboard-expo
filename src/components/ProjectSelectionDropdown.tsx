import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  useDisclosure,
} from "@heroui/react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

export default function ProjectSelectionDropdown() {
  const [selectedKeys, setSelectedKeys] = useState<string | null>(
    "Select a project"
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleSelectionChange = (keys: any) => {
    let selectedId: string | null = null;

    if (typeof keys === "string") {
      selectedId = keys;
    } else if (keys && typeof keys === "object" && "currentKey" in keys) {
      selectedId = keys.currentKey || null;
    }

    setSelectedKeys(selectedId);
  };

  return (
    <View style={{}}>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <View style={styles.container}>
            <Text numberOfLines={1} style={styles.dropdownText}>
              {selectedKeys}
            </Text>
            <Ionicons name="chevron-expand-outline" size={16} color="white" />
          </View>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Select a Project"
          selectedKeys={new Set(selectedKeys ? [selectedKeys] : [])}
          selectionMode="single"
          variant="flat"
          onSelectionChange={(keys) => {
            const keyArray = Array.from(keys);
            if (!keyArray.includes("new-project")) {
              handleSelectionChange(keys);
            }
          }}
        >
          <DropdownSection showDivider title="Your projects">
            {["Know App", "PlaySpot", "NTWRK"].map((project) => (
              <DropdownItem key={project} textValue={project}>
                {project}
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection aria-label="Create a new project">
            <DropdownItem
              onPress={onOpen}
              key="new-project"
              textValue="Create a new project"
            >
              Create a new project
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
