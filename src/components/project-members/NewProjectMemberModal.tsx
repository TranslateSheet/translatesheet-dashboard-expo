import type { Selection } from "@heroui/react";

import React, { useState } from "react";
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
import { ProjectMemberRole } from "@/api/types";

export function NewProjectMemberModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { addProjectMember } = useAddProjectMember();

  const [selectedRole, setSelectedRole] = useState<ProjectMemberRole>("editor");
  const [email, setEmail] = useState<string>("");

  // Only include valid options
  const roleOptions: ProjectMemberRole[] = [
    "owner",
    "admin",
    "editor",
    "viewer",
  ];

  // Wrap the state setter to extract the first selected key
  const handleSelectionChange = (keys: Selection) => {
    const selected = Array.from(keys as Set<string>)[0];
    if (selected) {
      setSelectedRole(selected as ProjectMemberRole);
    }
  };

  const handleAddNewMember = async () => {
    await addProjectMember({
      projectMemberRole: selectedRole,
      projectMemberEmail: email,
    });
    onClose()
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
                  >
                    <Input
                      isRequired
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                              {selectedRole}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            selectedKeys={new Set([selectedRole])}
                            selectionMode="single"
                            onSelectionChange={handleSelectionChange}
                          >
                            {roleOptions.map((role) => (
                              <DropdownItem key={role}>{role}</DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      }
                      label="Email Address"
                      labelPlacement="outside"
                      name="email"
                      placeholder="Enter email"
                      type="email"
                    />
                    <Button
                      onPress={handleAddNewMember}
                      color="primary"
                      size="md"
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
    color: "#4B5563",
  },
  cancelButton: {
    marginRight: 8,
  },
});
