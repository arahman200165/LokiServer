import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { authStyles } from "../../src/auth/ui";
import { apiGet, apiPost } from "../../src/auth/api";
import { loadAuthFlowState, saveAuthFlowPatch } from "../../src/auth/flowStore";
import { signUtf8WithPrivateJwk } from "../../src/auth/crypto";

type ChallengeResponse = { challenge_id: string; challenge: string };
type LoginResponse = { session_token: string; user_id: string };

export default function UnlockScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlock = async () => {
    setError(null);
    setLoading(true);
    try {
      const state = await loadAuthFlowState();
      if (!state.deviceId || !state.devicePrivateJwk) {
        throw new Error("We couldn't unlock your secure storage on this device.");
      }

      const challenge = await apiPost<ChallengeResponse>("/v1/auth/challenge", {
        device_id: state.deviceId,
      });
      const signature = await signUtf8WithPrivateJwk(
        state.devicePrivateJwk,
        challenge.challenge,
      );

      const login = await apiPost<LoginResponse>("/v1/auth/login", {
        device_id: state.deviceId,
        challenge_id: challenge.challenge_id,
        challenge_signature: signature,
      });

      await saveAuthFlowPatch({
        authToken: login.session_token,
        userId: login.user_id,
        deviceId: state.deviceId,
      });

      await apiGet("/v1/sync/bootstrap", login.session_token);
      router.replace("/(tabs)/chat");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "We couldn't unlock your secure storage on this device.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={authStyles.container} contentContainerStyle={authStyles.scrollContent}>
      <Text style={authStyles.title}>Unlock app</Text>
      <Text style={authStyles.subtitle}>Use your device security method to continue.</Text>
      {error ? <Text style={authStyles.warning}>{error}</Text> : null}

      <Pressable style={authStyles.primaryButton} onPress={() => void unlock()}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={authStyles.primaryText}>Unlock</Text>
        )}
      </Pressable>

      <Pressable
        style={authStyles.secondaryButton}
        onPress={() => router.push("/(auth)/restore-or-add-device")}
      >
        <Text style={authStyles.secondaryText}>Having trouble?</Text>
      </Pressable>
    </ScrollView>
  );
}
