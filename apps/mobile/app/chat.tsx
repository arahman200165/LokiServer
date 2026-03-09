import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const chats = [
  { id: "1", name: "Alice", lastMessage: "Hey, are you free later?" },
  { id: "2", name: "Bob", lastMessage: "Let’s push the backend update." },
  {
    id: "3",
    name: "Team Loki",
    lastMessage: "New build is ready for testing.",
  },
  { id: "4", name: "Sarah", lastMessage: "Can you send the design draft?" },
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Chats</Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable style={styles.chatCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.chatContent}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </Pressable>
        )}
      />

      <Pressable style={styles.newChatButton}>
        <Text style={styles.newChatButtonText}>+ New Chat</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  chatMessage: {
    color: "#94a3b8",
    fontSize: 14,
  },
  newChatButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  newChatButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
