import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet, View, Text, Pressable } from "react-native";

import { Icon } from "@iconify/react";
import { useSession } from "@/providers/AuthContext";
import { usePathname, useRouter } from "expo-router";

const getIconForRoute = (routeName: string): string => {
  switch (routeName) {
    case "index":
      return "solar:home-2-linear";
    case "api-keys":
      return "solar:key-outline";
    case "billing":
      return "solar:checklist-minimalistic-outline";
    case "projects":
    case "project-members":
    default:
      return "solar:question-circle-outline";
  }
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { state, descriptors } = props;
  const { signOut } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const renderLabel = (focused: boolean, route: any) => {
    const { options } = descriptors[route.key];
    const label = options.drawerLabel?.toString() || route.name;

    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.label, focused && styles.labelFocused]}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {pathname.includes("project") && (
          <Pressable
            style={{ flexDirection: "row", gap: 4, paddingBottom: 12 }}
            onPress={() => router.push("/(app)/(home)")}
          >
            <Icon icon="solar:arrow-left-linear" width={16} />
            <Text style={{ color: "#777", fontSize: 12 }}>Dashboard</Text>
          </Pressable>
        )}
        <View style={{ gap: 4 }}>
          {state.routes.map((route) => (
            <DrawerItem
              //   activeTintColor="green"
              activeBackgroundColor="rgba(0, 0, 0, 0.1)"
              key={route.key}
              label={({ focused }) => renderLabel(focused, route)}
              onPress={() => props.navigation.navigate(route.name)}
              focused={state.index === state.routes.indexOf(route)}
              icon={() => (
                <Icon icon={getIconForRoute(route.name)} style={styles.icon} />
              )}
              style={styles.drawerItem}
            />
          ))}
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Sign Out"
        onPress={signOut}
        style={[styles.drawerItem, { marginBottom: 16 }]}
      />
    </View>
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
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  labelFocused: {
    color: "#000",
  },
  drawerItem: { borderRadius: 16, height: 40, justifyContent: "center" },
});
