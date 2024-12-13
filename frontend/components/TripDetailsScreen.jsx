import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native";
import { Layout,Text, Divider, Icon, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { useTripsContext } from "@/state/ItineraryContext";
import ItineraryList from "@/components/itineraryList";
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);
export default function TripDetails({ navigation, route }) {
	const id = route.params.id;
	const { state, dispatch } = useTripsContext();
	const [currentTrip, setCurrentTrip] = useState(null);

	const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

	useEffect(() => {
		setCurrentTrip(state.trips.filter((trip) => trip.id == id)[0])
	}, [id]);
	const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
			<TopNavigation 
				title={props => <Text {...props} style={[props.style, { fontSize: 22, fontWeight: "bold" }]}>Trip Details</Text>} 
				accessoryLeft={BackAction}/>
      <Divider/>
			<Layout style={{flex: 1}}>
				{currentTrip && <ItineraryList trip={currentTrip} />}
			</Layout>
		</SafeAreaView>
  );
}
