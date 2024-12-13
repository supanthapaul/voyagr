import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native";
import { Image } from 'expo-image';
import { Layout,Text, Divider, Icon, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useTripsContext } from "@/state/ItineraryContext";
import ItineraryList from "@/components/itineraryList";
import axios from 'axios';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);
export default function TripDetails({ navigation, route }) {
	const id = route.params.id;
	const { state, dispatch } = useTripsContext();
	const [currentTrip, setCurrentTrip] = useState(null);
	const [image, setImage] = useState();

	const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const fetchImage = async() =>{
	try {
        const token = await getAuth().currentUser.getIdToken(/* forceRefresh */ true) 
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/image`, {
          headers: {
            'Authorization': token, 
          },
          params: {
            searchQuery: currentTrip?.destination || 'nature', 
            pageQuery: 1, 
          },
        });
        setImage(response.data[0].src.medium);
		console.log(response.data[0].src.original);
		
      } catch (err) {
        setError(err.message);
      }
  }

	useEffect(() => {
		setCurrentTrip(state.trips.filter((trip) => trip.id == id)[0])
	}, [id]);

	useEffect(() => {
		if(currentTrip == null){
			return;
		}
		console.log(currentTrip.destination);
		
		fetchImage(); 
	  }, [currentTrip]);

	const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
			<TopNavigation 
				title={props => <Text {...props} style={[props.style, { fontSize: 22, fontWeight: "bold" }]}>Trip Details</Text>} 
				accessoryLeft={BackAction}/>
      <Divider/>
			<Layout style={{flex: 1}}>
			{image && (
          <Image
					source={image}
						placeholder={{ blurhash }}
            style={{ width: "100%", height: 200, marginBottom: 10 }} 
						contentFit="cover"
        transition={1000}
          />
			)}
				{currentTrip && <ItineraryList trip={currentTrip} />}
			</Layout>
		</SafeAreaView>
  );
}
