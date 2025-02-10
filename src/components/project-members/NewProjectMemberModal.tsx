// https://www.heroui.pro/components/application/cards

import type { Selection } from "@heroui/react";

import React from "react";
import {
  Card,
  Button,
  Input,
  Form,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  useDisclosure,
  CardBody,
  Spacer,
  ModalHeader,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { StyleSheet } from "react-native";
import useAddProjectMember from "@/api/useAddProjectMember";

export function NewProjectMemberModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { addProjectMember } = useAddProjectMember();
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["can-view"])
  );

  const permissionLabels: Record<string, string> = {
    "can-view": "Can View",
    "can-edit": "Can Edit",
  };

  const handleAddNewMember = async () => {
    // TODO: role needs to be conditional
    await addProjectMember({ projectMemberRole: "owner" });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={
          <Icon style={styles.icon} icon="solar:user-plus-outline" width={16} />
        }
      >
        Invite new member
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <Card className="w-full max-w-[800px]">
                <ModalHeader className="px-6 pb-0 pt-6">
                  <div className="flex flex-col items-start">
                    <h4 className="text-large">Invite Members</h4>
                    <p className="text-small text-default-500">
                      Invite new members to your project
                    </p>
                  </div>
                </ModalHeader>
                <Spacer y={2} />
                <CardBody className="px-6 py-6">
                  <Form
                    className="w-full flex-row flex-nowrap items-end"
                    validationBehavior="native"
                    // onSubmit={handleSubmit}
                  >
                    <Input
                      isRequired
                      endContent={
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              className="text-default-500"
                              endContent={
                                <span className="hidden sm:flex">
                                  <Icon icon="solar:alt-arrow-down-linear" />
                                </span>
                              }
                              size="sm"
                              variant="light"
                            >
                              {Array.from(selectedKeys)
                                .map((key) => permissionLabels[key])
                                .join(", ")}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            selectedKeys={selectedKeys}
                            selectionMode="single"
                            onSelectionChange={setSelectedKeys}
                          >
                            <DropdownItem key="can-view">Can view</DropdownItem>
                            <DropdownItem key="can-edit">Can edit</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      }
                      label="Email Address"
                      labelPlacement="outside"
                      name="email"
                      placeholder="Email comma separated"
                      type="email"
                    />
                    <Button
                      onPress={handleAddNewMember}
                      color="primary"
                      size="md"
                      type="submit"
                    >
                      Invite
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

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
