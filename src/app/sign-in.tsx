import { View, Text } from "react-native";
import React from "react";
import { Button } from "@heroui/react";
import { useSession } from "@/providers/AuthContext";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { signIn, session, isLoading } = useSession();

  if (!isLoading && session) {
    return <Redirect href="/" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={signIn}>sign-in</Button>
    </View>
  );
};

export default SignIn;
