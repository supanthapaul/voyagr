import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import {Link} from 'expo-router';
import { SafeAreaView } from "react-native";
import { Layout,Text } from "@ui-kitten/components";

export default function Hello() {
	const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
			<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text category='h1'>Hello</Text>
				<Link href={"/"}>
					<Text>Go to Home</Text>
				</Link>
			</Layout>
		</SafeAreaView>
  );
}
