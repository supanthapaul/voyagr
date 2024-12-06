import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {Link} from 'expo-router';

export default function Hello() {
	const colorScheme = useColorScheme();
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
			<Link replace href="/">Go to test</Link>
      <ThemedText>HELLO COMPONENT!</ThemedText>
    </ThemedView>
  );
}
