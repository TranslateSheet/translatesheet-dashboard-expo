import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

const NewProjectModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [apiKeyName, setApiKeyName] = useState<string>("");
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={
          <Icon style={styles.icon} icon="lucide:plus" width={16} />
        }
      >
        Create new project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader style={styles.header}>
                Create a new project
              </ModalHeader>
              <ModalBody>
                <ThemedText>Enter a name for your project</ThemedText>
                <Input
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value)}
                  variant="bordered"
                  label="Project name"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
                <Button color="primary" onPress={() => {}}>
                  Create new project
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexShrink: 0,
    color: "currentColor",
  },
  header: {
    flexDirection: "column",
  },
  description: {
    marginBottom: 16,
    fontSize: 14,
    color: "#4B5563", // equivalent to text-gray-600
  },
  cancelButton: {
    marginRight: 8,
  },
});

export default NewProjectModal;
