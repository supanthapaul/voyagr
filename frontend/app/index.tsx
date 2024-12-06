import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, View } from "react-native";
import {Link} from 'expo-router';
import { Icon, IconElement, Text, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

// const BackIcon = (props): IconElement => (
//   <Icon
//     {...props}
//     name='arrow-back'
//   />
// );

// const BackAction = (): React.ReactElement => (
//   <TopNavigationAction icon={BackIcon} />
// );

export default function Index() {
  return (
		<SafeAreaView style={{ flex: 1 }}>
			<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text category='h1'>HOME</Text>
				<Link href={"/hello"}>
					<Text>Go to hello</Text>
				</Link>
			</Layout>
		</SafeAreaView>
  );
}
