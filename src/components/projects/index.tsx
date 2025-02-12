import { View, StyleSheet } from "react-native";
import React from "react";
import { ProjectCard } from "./ProjectCard";
import useGetUserProjects from "@/api/useGetUserProjects";


export function Projects() {
  const projects = useGetUserProjects();
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {projects?.data?.map((project) => (
          <View key={project.name} style={styles.cardWrapper}>
            <ProjectCard project={project} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  cardWrapper: {
    width: "33.33%", // This ensures 3 cards per row
    padding: 8, // Add some spacing between cards
  },
});
