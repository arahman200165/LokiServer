import { Alert, Pressable, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { authStyles } from "../../src/auth/ui";

export default function WelcomeScreen() {
  return (
    <ScrollView style={authStyles.container} contentContainerStyle={authStyles.scrollContent}>
      <Text style={authStyles.title}>Private messaging, built to protect your data</Text>
      <Text style={authStyles.subtitle}>
        No phone number required. No email required. Your messages and keys stay under your
        control.
      </Text>

      <Pressable
        style={authStyles.primaryButton}
        onPress={() => router.push("/(auth)/create-account-intro")}
      >
        <Text style={authStyles.primaryText}>Create private account</Text>
      </Pressable>

      <Pressable
        style={authStyles.secondaryButton}
        onPress={() => router.push("/(auth)/restore-or-add-device")}
      >
        <Text style={authStyles.secondaryText}>Restore existing account</Text>
      </Pressable>

      <Pressable
        style={authStyles.tertiaryButton}
        onPress={() =>
          Alert.alert(
            "How privacy works",
            "The app authenticates devices, not passwords. Keys are generated and stored locally.",
          )
        }
      >
        <Text style={authStyles.tertiaryText}>Learn how privacy works</Text>
      </Pressable>
    </ScrollView>
  );
}
