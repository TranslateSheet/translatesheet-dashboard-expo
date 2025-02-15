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
import { usePathname, useRouter } from "expo-router";
import { ProjectSelectionDropdown } from "../projects/ProjectSelectionDropdown";

export const TopNavigationBar = () => {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { signOut, session } = useSession();
  const pathname = usePathname();

  return (
    <Navbar style={styles.navbar} height="64px" maxWidth="full">
      {!isDesktop && (
        <Pressable style={styles.menuButton}>
          <Icon icon="solar:hamburger-menu-linear" width={24} color="white" />
        </Pressable>
      )}

      {pathname.includes("project") ? (
        <ProjectSelectionDropdown />
      ) : (
        <NavbarBrand onClick={() => router.push("/")}>
          <Text style={styles.brandText}>TranslateSheet</Text>
        </NavbarBrand>
      )}
      {/* Right Menu */}
      <NavbarContent style={styles.rightContent}>
        {/* Theme change */}
        {/* <NavbarItem style={styles.navbarItem}>
          <Button isIconOnly radius="full" variant="light">
            <Icon icon="solar:sun-linear" width={24} color="white" />
          </Button>
        </NavbarItem> */}
        {/* Settings */}
        {/* <NavbarItem style={styles.navbarItem}>
          <Button isIconOnly radius="full" variant="light">
            <Icon icon="solar:settings-linear" width={24} color="white" />
          </Button>
        </NavbarItem> */}
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
                  <Avatar
                    size="sm"
                    src={session?.user.user_metadata.avatar_url}
                  />
                </Badge>
              </Pressable>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem textValue="profile" key="profile">
                <View style={styles.profileDropdownItem}>
                  <Text style={styles.dropdownLabelBold}>Signed in as</Text>
                  <Text style={styles.dropdownLabelBold}>
                    {session?.user.user_metadata.full_name}
                  </Text>
                </View>
              </DropdownItem>
              {/* <DropdownItem textValue="My Settings" key="settings">My Settings</DropdownItem>
              <DropdownItem textValue="Team Settings" key="team_settings">Team Settings</DropdownItem>
              <DropdownItem textValue="Analytics" key="analytics">Analytics</DropdownItem>
              <DropdownItem textValue="System" key="system">System</DropdownItem>
              <DropdownItem textValue="Configurations" key="configurations">Configurations</DropdownItem>
              <DropdownItem textValue="Help & Feedback" key="help_and_feedback">
                Help & Feedback
              </DropdownItem> */}
              <DropdownItem
                textValue="Log Out"
                onPress={signOut}
                key="logout"
                color="danger"
              >
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
    backgroundColor: "#488BF2",
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
    borderColor: "#488BF2",
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
