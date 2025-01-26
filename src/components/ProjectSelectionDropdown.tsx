"use dom"

import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
  useDisclosure,
} from "@heroui/react";
// import useGetUserProjects from 'api/useGetUserProjects';
// import { useProjects } from 'providers/ProjectsProvider';
// import { ChevronsUpDown, PlusCircle } from 'lucide-react';
// import NewProjectModal from './NewProjectModal';

export default function ProjectSelectionDropdown() {
  const [selectedKeys, setSelectedKeys] = useState<string | null>("TESTINGGGG");
  //   const { projects } = useGetUserProjects();
  //   const { currentProject, setCurrentProject } = useProjects();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Sync selectedKeys with currentProject
  //   useEffect(() => {
  //     if (currentProject) {
  //       setSelectedKeys(currentProject.id);
  //     }
  //   }, [currentProject]);

  // Memoize selectedValue
  //   const selectedValue = React.useMemo(() => {
  //     if (selectedKeys) {
  //       return (
  //         projects?.find((project) => project.id === selectedKeys)?.name ||
  //         "Create a new project"
  //       );
  //     }
  //     return "Create a new new project";
  //   }, [selectedKeys, projects]);

  // Handle selection change
  const handleSelectionChange = (keys: any) => {
    let selectedId: string | null = null;

    if (typeof keys === "string") {
      selectedId = keys; // Handle single selection mode
    } else if (keys && typeof keys === "object" && "currentKey" in keys) {
      selectedId = keys.currentKey || null; // For specific SharedSelection handling
    }

    setSelectedKeys(selectedId);

    // const selectedProject = projects?.find(
    //   (project) => project.id === selectedId
    // );

    // setCurrentProject(selectedProject || null);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex flex-row items-center gap-1">
            <p className="truncate text-small font-medium text-default-600">
              yoooooooo
            </p>
            {/* <ChevronsUpDown
              width={16} // Adjust size as needed
              height={16}
              className="text-default-500 group-data-[selected=true]:text-foreground"
            /> */}
          </div>
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
            {["testing123", "this is a mf test"].map((project) => (
              <DropdownItem key={project} textValue={project}>
                {project}
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection aria-label="Create a new project">
            <DropdownItem
              onPress={onOpen}
              //   startContent={
              //     <PlusCircle className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
              //   }
              key="new-project"
              textValue="Create a new project"
            >
              Create a new project
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      {/* <NewProjectModal
        onClose={onClose}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      /> */}
    </>
  );
}
