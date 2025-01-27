import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ProjectCard from "./ProjectCard";

const dummyProjects = [
  { title: "PlaySpot" },
  { title: "Know App" },
  { title: "NTWRK" },
  { title: "Your moms pussy" },
];

export function Projects() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {dummyProjects.map((project) => (
          <View key={project.title} style={styles.cardWrapper}>
            <ProjectCard title={project.title} />
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

export default Projects;