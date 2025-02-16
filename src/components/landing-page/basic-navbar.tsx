"use client";

import type { NavbarProps } from "@heroui/react";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./social";
import { StyleSheet } from "react-native";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useRouter } from "expo-router";

type MenuItem = { label: string; href: string };

const menuItems: MenuItem[] = [
  { label: "Docs", href: "https://docs.translatesheet.co/" },
];

const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isDesktop = useIsDesktop();
    const router = useRouter();
    return (
      <Navbar
        ref={ref}
        {...props}
        style={
          isMenuOpen
            ? { ...styles.navbar, ...styles.navbarOpen }
            : styles.navbar
        }
        height="60px"
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        shouldHideOnScroll
        isBordered
      >
        <NavbarBrand>
          <span style={styles.brandText}>TranslateSheet</span>
        </NavbarBrand>
        {isDesktop ? (
          <NavbarContent justify="center">
            {menuItems.slice(0, 4).map((item, index) => (
              <NavbarItem key={index}>
                <Link style={styles.link} href={item.href} size="sm">
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
            <NavbarItem isActive>
              <Button
                style={styles.getStartedButton}
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                radius="md"
                variant="flat"
                onPress={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <>
            <NavbarMenuToggle style={styles.menuToggle} />
            <NavbarMenu style={styles.menu}>
              <NavbarMenuItem>
                <Button
                  style={styles.getStartedButton}
                  color="secondary"
                  endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                  radius="md"
                  variant="flat"
                  fullWidth
                  onPress={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              </NavbarMenuItem>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={index}>
                  <Link style={styles.menuLink} href={item.href} size="md">
                    {item.label}
                  </Link>
                  {index < menuItems.length - 1 && (
                    <Divider style={styles.divider} />
                  )}
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </>
        )}
      </Navbar>
    );
  }
);

BasicNavbar.displayName = "BasicNavbar";

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "transparent",
  },
  navbarOpen: {
    backgroundColor: "rgba(240, 240, 240, 0.5)",
  },
  logoContainer: {
    borderRadius: 50,
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  brandText: {
    marginLeft: 8,
    fontSize: 22,
    fontWeight: "500",
    color: "#000",
  },
  link: {
    color: "#666",
    textDecorationLine: "none",
  },
  linkActive: {
    color: "#000",
    fontWeight: "bold",
  },
  rightContent: {
    display: "none",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  loginButton: {
    color: "#666",
    backgroundColor: "transparent",
  },
  getStartedButton: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "500",
  },
  menuToggle: {
    color: "#888",
  },
  menu: {
    position: "absolute",
    top: 60,
    width: "100%",
    backgroundColor: "rgba(240, 240, 240, 0.8)",
    paddingBottom: 16,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    backdropFilter: "blur(10px)",
  },
  menuLink: {
    color: "#666",
    marginBottom: 8,
  },
  divider: {
    opacity: 0.5,
  },
});

export default BasicNavbar;
