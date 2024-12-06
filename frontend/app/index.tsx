import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Text, View } from "react-native";
import {Link} from 'expo-router';

export default function Index() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
			<Link replace href="/hello">Go to test</Link>
      <ThemedText>Edit app/index.tsx to edit this screen!!</ThemedText>
    </ThemedView>
  );
}
