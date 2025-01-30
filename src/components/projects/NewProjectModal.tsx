// https://www.heroui.pro/components/application/cards

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  Input,
  Modal,
  ModalContent,
  Spacer,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

export function NewProjectModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [projectName, setProjectName] = useState<string>("");
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
      <Modal
        isOpen={isOpen}
        onClose={() => console.log("eu˝")}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent style={{ maxWidth: 550 }}>
          {() => (
            <View style={styles.modalContainer}>
              <View style={styles.headerWrap}>
                <ThemedText fontWeight="500" type="subtitle">
                  Project Name
                </ThemedText>
                <ThemedText lightColor="#9a9a9a" type="small">
                  Projects organize your services to make app development
                  easier.
                </ThemedText>
              </View>
              <View style={styles.formContainer}>
                <Form
                  className="gap-0"
                  validationBehavior="native"
                  // onSubmit={handleSubmit}
                >
                  <Input
                    isClearable
                    isRequired
                    // errorMessage={() => (
                    //   <ul>
                    //     {errors.map((error, i) => (
                    //       <li key={i}>{error}</li>
                    //     ))}
                    //   </ul>
                    // )}
                    // isInvalid={errors.length > 0}
                    label="Project Name"
                    maxLength={20}
                    name="orgName"
                    value={projectName}
                    onValueChange={setProjectName}
                  />
                  <Spacer y={2} />
                  <ThemedText type="small">
                    Max. 20 characters.{" "}
                    <ThemedText type="small">
                      {projectName.length}/20
                    </ThemedText>
                  </ThemedText>
                  <Spacer y={2} />
                  <Divider />
                  <View style={styles.buttonWrap}>
                    <Button type="reset" variant="bordered">
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Create a project
                    </Button>
                  </View>
                </Form>
              </View>
            </View>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 24,
    maxWidth: 800,
    gap: 24,
  },
  headerWrap: {
    gap: 8,
  },
  formContainer: {
    // paddingTop: 16,
  },
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
  buttonWrap: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    gap: 8,
    paddingTop: 24,
  },
});
