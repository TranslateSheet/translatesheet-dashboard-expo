import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSession } from "@/providers/AuthContext";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const TopNavigationBar = () => {
  const isDesktop = useIsDesktop();
  const { signOut } = useSession();

  return (
    <Navbar style={styles.navbar} height="64px" maxWidth="full">
      {!isDesktop && (
        <Pressable style={styles.menuButton}>
          <Icon icon="solar:hamburger-menu-linear" width={24} color="white" />
        </Pressable>
      )}

      <NavbarBrand>
        <Text style={styles.brandText}>TranslateSheet</Text>
      </NavbarBrand>

      {/* Right Menu */}
      <NavbarContent style={styles.rightContent}>
        {/* Theme change */}
        <NavbarItem style={styles.navbarItem}>
          <Button isIconOnly radius="full" variant="light">
            <Icon icon="solar:sun-linear" width={24} color="white" />
          </Button>
        </NavbarItem>
        {/* Settings */}
        <NavbarItem style={styles.navbarItem}>
          <Button isIconOnly radius="full" variant="light">
            <Icon icon="solar:settings-linear" width={24} color="white" />
          </Button>
        </NavbarItem>
        {/* User Menu */}
        <NavbarItem style={styles.userMenuItem}>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Pressable style={styles.avatarButton}>
                <Badge
                  style={styles.badge}
                  color="success"
                  content=""
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar size="sm" src="" />
                </Badge>
              </Pressable>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                <View style={styles.profileDropdownItem}>
                  <Text style={styles.dropdownLabelBold}>Signed in as</Text>
                  <Text style={styles.dropdownLabelBold}>TODO:</Text>
                </View>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem onPress={signOut} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#6366f1",
    height: 64,
  },
  menuButton: {
    padding: 8,
  },
  brandText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  rightContent: {
    marginLeft: "auto",
    height: 48,
    maxWidth: "auto",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 0,
  },
  navbarItem: {
    display: "flex", // lg:flex
  },
  userMenuItem: {
    paddingLeft: 8,
  },
  avatarButton: {
    marginTop: 4,
    height: 32,
    width: 32,
    transform: [{ scale: 1 }],
  },
  badge: {
    borderColor: "#6366f1",
  },
  profileDropdownItem: {
    height: 56,
    gap: 8,
    justifyContent: "center",
  },
  dropdownLabelBold: {
    fontWeight: "600",
  },
});
