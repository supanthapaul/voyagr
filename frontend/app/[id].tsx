import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import {Link} from 'expo-router';
import { SafeAreaView } from "react-native";
import { Layout,Text } from "@ui-kitten/components";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { useTripsContext } from "@/state/ItineraryContext";
import ItineraryList from "@/components/itineraryList";

export default function TripDetails() {
	const { id } = useLocalSearchParams();
	const { state, dispatch } = useTripsContext();
	const [currentTrip, setCurrentTrip] = useState(null);

	useEffect(() => {
		setCurrentTrip(state.trips.filter((trip: { id: any; }) => trip.id == id)[0])
	}, [id]);
	const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
			<Layout style={{flex: 1}}>
				{currentTrip && <ItineraryList trip={currentTrip} />}
			</Layout>
		</SafeAreaView>
  );
}
