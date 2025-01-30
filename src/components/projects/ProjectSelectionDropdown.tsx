import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  useDisclosure,
} from "@heroui/react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import useGetUserProjects from "@/api/useGetUserProjects";

export function ProjectSelectionDropdown() {
  const { projectId } = useGlobalSearchParams();
  const { projects, loading: projectsLoading, error } = useGetUserProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>();
  const router = useRouter();
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    if (projects && projects.length > 0) {
      // Find the project matching the projectId or default to the first project
      const matchingProject = projectId
        ? projects.find((project) => project.id === projectId)
        : projects[0];

      if (matchingProject) {
        setSelectedProject(matchingProject.name);
        if (!projectId) {
          router.setParams({ projectId: matchingProject.id }); // Set default projectId if not provided
        }
      }
    }
  }, [projects, projectId, router]);

  const handleSelectionChange = (keys: any) => {
    let selectedId: string | null = null;

    if (typeof keys === "string") {
      selectedId = keys;
    } else if (keys && typeof keys === "object" && "currentKey" in keys) {
      selectedId = keys.currentKey || null;
    }

    if (selectedId) {
      const selectedProject = projects?.find(
        (project) => project.id === selectedId
      );
      if (selectedProject) {
        setSelectedProject(selectedProject.name);
        router.setParams({ projectId: selectedId });
      }
    }
  };

  if (projectsLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#fff" />
        <Text style={styles.loadingText}>Loading projects...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading projects: {error}</Text>
      </View>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <View style={styles.noProjectsContainer}>
        <Text style={styles.noProjectsText}>No projects available.</Text>
      </View>
    );
  }

  return (
    <View>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <View style={styles.container}>
            <Text numberOfLines={1} style={styles.dropdownText}>
              {selectedProject}
            </Text>
            <Ionicons name="chevron-expand-outline" size={16} color="white" />
          </View>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Select a Project"
          selectedKeys={new Set(selectedProject ? [selectedProject] : [])}
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
            {projects.map((project) => (
              <DropdownItem key={project.id} textValue={project.name}>
                {project.name}
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
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  loadingText: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 14,
  },
  errorContainer: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  noProjectsContainer: {
    padding: 10,
  },
  noProjectsText: {
    color: "#fff",
    fontSize: 14,
  },
});
