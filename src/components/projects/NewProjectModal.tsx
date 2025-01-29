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
import { StyleSheet } from "react-native";

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <Card className="w-full max-w-[500px]">
                <CardHeader className="px-6 pb-0 pt-6">
                  <div className="flex flex-col items-start">
                    <h4 className="text-large">Project Name</h4>
                    <p className="text-small text-default-500">
                      Add a name to your project
                    </p>
                  </div>
                </CardHeader>
                <Spacer y={2} />
                <CardBody className="px-4">
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
                    <Spacer y={6} />
                    <Divider />
                    <div className="flex w-full flex-wrap-reverse items-center justify-between gap-2 px-4 pt-4 md:flex-wrap">
                      <p className="text-small text-default-400">
                        Max. 20 characters.{" "}
                        <span className="text-default-500">
                          {projectName.length}/20
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <Button type="reset" variant="bordered">
                          Cancel
                        </Button>
                        <Button color="primary" type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
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
