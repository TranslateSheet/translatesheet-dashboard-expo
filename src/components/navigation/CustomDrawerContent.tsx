import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
  } from "@react-navigation/drawer";
  import { StyleSheet, View, Text } from "react-native";
  import ProjectSelectionDropdown from "../ProjectSelectionDropdown";
  import { Icon } from "@iconify/react";
  
  const getIconForRoute = (routeName: string): string => {
    switch (routeName) {
      case "index":
        return "solar:home-2-linear";
      case "api-keys":
        return "solar:key-outline";
      case "billing":
        return "solar:checklist-minimalistic-outline";
      default:
        return "solar:question-circle-outline";
    }
  };
  
  export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { state, descriptors } = props;
  
    const renderLabel = (focused: boolean, route: any) => {
      const { options } = descriptors[route.key];
      const label = options.drawerLabel?.toString() || route.name;
  
      return (
        <View style={styles.itemContainer}>
          <Icon 
            icon={getIconForRoute(route.name)}
            style={styles.icon} 
          />
          <Text style={[styles.label, focused && styles.labelFocused]}>
            {label}
          </Text>
        </View>
      );
    };
  
    return (
      <DrawerContentScrollView {...props}>
        <ProjectSelectionDropdown />
        {state.routes.map((route) => (
          <DrawerItem
            key={route.key}
            label={({ focused }) => renderLabel(focused, route)}
            onPress={() => props.navigation.navigate(route.name)}
            focused={state.index === state.routes.indexOf(route)}
          />
        ))}
      </DrawerContentScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    icon: {
      width: 20,
      height: 20,
    },
    label: {
      fontSize: 16,
      color: "#666",
    },
    labelFocused: {
      color: "#000",
    },
  });