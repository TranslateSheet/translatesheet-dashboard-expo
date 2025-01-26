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

export const TopNavigationBar = () => {
  const { signOut } = useSession();
  return (
    <Navbar
      classNames={{
        base: "bg-primary-500 dark:bg-primary-400",
        wrapper: "px-4 sm:px-6",
        item: "data-[active=true]:text-primary",
      }}
      height="64px"
      maxWidth="full"
    >
      <NavbarBrand>
        {/* <NavbarMenuToggle className="mr-2 h-6 sm:hidden" /> */}
        {/* <TranslateSheetIcon /> */}
        <p className="font-bold text-inherit text-white">TranslateSheet</p>
      </NavbarBrand>

      {/* Right Menu */}
      <NavbarContent
        className="ml-auto h-12 max-w-fit items-center gap-0"
        justify="end"
      >
        {/* Theme change */}
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon icon="solar:sun-linear" width={24} color="white" />
          </Button>
        </NavbarItem>
        {/* Settings */}
        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon icon="solar:settings-linear" width={24} color="white" />
          </Button>
        </NavbarItem>
        {/* User Menu */}
        <NavbarItem className="px-2">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="mt-1 h-8 w-8 transition-transform">
                <Badge
                  classNames={{
                    badge: "border-primary",
                  }}
                  color="success"
                  content=""
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar size="sm" src="" />
                </Badge>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">TODO:</p>
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
