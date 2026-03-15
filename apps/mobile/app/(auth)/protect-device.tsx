import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { authStyles } from "../../src/auth/ui";
import { loadAuthFlowState, saveAuthFlowPatch } from "../../src/auth/flowStore";
import { apiPost } from "../../src/auth/api";

const LOCK_OPTIONS = ["biometric", "pin", "passphrase"] as const;

export default function ProtectDeviceScreen() {
  const [lockMode, setLockMode] = useState<string>("biometric");
  const [loading, setLoading] = useState(false);
  const optionLabel = useMemo(
    () => ({
      biometric: "Use Face ID / Fingerprint",
      pin: "Use device PIN",
      passphrase: "Set app passphrase",
    }),
    [],
  );

  const continueWithLock = async (mode: string) => {
    setLoading(true);
    try {
      const state = await loadAuthFlowState();
      await saveAuthFlowPatch({ lockMode: mode });

      if (state.authToken && state.deviceId) {
        await apiPost(
          `/v1/devices/${state.deviceId}/security-state`,
          {
            local_lock_enabled: mode !== "none",
            lock_mode: mode,
          },
          state.authToken,
        );
      }

      router.push("/(auth)/display-name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={authStyles.container} contentContainerStyle={authStyles.scrollContent}>
      <Text style={authStyles.title}>Protect this device</Text>
      <Text style={authStyles.subtitle}>
        Choose how to unlock the app on this device.
      </Text>
      <Text style={authStyles.helper}>This protects your private keys stored on this device.</Text>

      {LOCK_OPTIONS.map((option) => (
        <Pressable
          key={option}
          style={[authStyles.card, lockMode === option ? { borderColor: "#60a5fa" } : null]}
          onPress={() => setLockMode(option)}
        >
          <Text style={authStyles.cardTitle}>
            {optionLabel[option as keyof typeof optionLabel]}
          </Text>
        </Pressable>
      ))}

      <Pressable
        style={[authStyles.primaryButton, loading ? { opacity: 0.7 } : null]}
        onPress={() => void continueWithLock(lockMode)}
      >
        <Text style={authStyles.primaryText}>Continue</Text>
      </Pressable>
      <Pressable
        style={authStyles.secondaryButton}
        onPress={() => void continueWithLock("none")}
      >
        <Text style={authStyles.secondaryText}>Skip for now</Text>
      </Pressable>
    </ScrollView>
  );
}
