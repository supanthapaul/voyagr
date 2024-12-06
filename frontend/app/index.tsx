import { SafeAreaView, View } from "react-native";
import {Link} from 'expo-router';
import { Icon, IconElement, Text, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import CreateForm from "@/components/CreateForm";

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
			<Layout style={{
				flex: 1}}>
				<CreateForm />
			</Layout>
		</SafeAreaView>
  );
}
