import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { authStyles } from "../../src/auth/ui";
import { loadAuthFlowState, saveAuthFlowPatch } from "../../src/auth/flowStore";

export default function RecoveryPhraseViewScreen() {
  const [phrase, setPhrase] = useState<string[]>([]);

  useEffect(() => {
    const run = async () => {
      const state = await loadAuthFlowState();
      setPhrase(state.recoveryPhrase ?? []);
    };
    void run();
  }, []);

  return (
    <ScrollView style={authStyles.container} contentContainerStyle={authStyles.scrollContent}>
      <Text style={authStyles.title}>Your recovery phrase</Text>
      <Text style={authStyles.subtitle}>
        Write these words down in order and keep them somewhere safe.
      </Text>

      <View style={authStyles.card}>
        {phrase.map((word, index) => (
          <Text key={`${word}-${index}`} style={authStyles.bullet}>
            {index + 1}. {word}
          </Text>
        ))}
      </View>

      <Text style={authStyles.warning}>
        Anyone with this phrase may be able to restore your account.
      </Text>

      <Pressable
        style={authStyles.primaryButton}
        onPress={async () => {
          await saveAuthFlowPatch({ recoveryPhraseViewed: true });
          router.push("/(auth)/verify-recovery-phrase");
        }}
      >
        <Text style={authStyles.primaryText}>I wrote it down</Text>
      </Pressable>

      <Pressable style={authStyles.secondaryButton} onPress={() => router.back()}>
        <Text style={authStyles.secondaryText}>Show again later</Text>
      </Pressable>
    </ScrollView>
  );
}
