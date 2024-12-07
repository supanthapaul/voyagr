import { SafeAreaView, View, StyleSheet } from "react-native";
import {Link} from 'expo-router';
import { Icon, IconElement, Text, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import CreateForm from "@/components/CreateForm";


export default function Index() {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 8
		},
  });

  return (
		<SafeAreaView style={{ flex: 1 }}>
			<Layout style={styles.container}>
				<CreateForm />
			</Layout>
		</SafeAreaView>
  );
}
