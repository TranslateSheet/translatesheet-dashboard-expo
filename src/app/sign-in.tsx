// https://www.heroui.pro/components/application/authentication#component-centered-login-with-top-logo

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { StyleSheet } from "react-native";
import { useSession } from "@/providers/AuthContext";
import { Redirect } from "expo-router";

export default function SignInScreen() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { signIn, isLoading, session } = useSession();

  if (!isLoading && session) {
    return <Redirect href="/" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        {/*TODO: LOGO HERE */}
        {/* <AcmeIcon size={60} /> */}
        <p style={styles.welcomeText}>Welcome Back</p>
        <p style={styles.subText}>Log in to your account to continue</p>
      </div>
      <div style={styles.formContainer}>
        <div style={styles.socialButtonsContainer}>
          <Button
            startContent={
              <Icon style={styles.githubIcon} icon="fe:github" width={24} />
            }
            variant="bordered"
            // TODO:
            onPress={signIn}
          >
            Continue with Github
          </Button>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: "#666", 
  },
  formContainer: {
    marginTop: 8,
    display: "flex",
    width: "100%",
    maxWidth: 384,
    flexDirection: "column",
    gap: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  icon: {
    pointerEvents: "none",
    fontSize: 24,
    color: "#999",
  },
  socialButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  githubIcon: {
    color: "#666",
  },
});
