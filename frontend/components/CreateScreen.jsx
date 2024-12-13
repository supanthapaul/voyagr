import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Input, RangeDatepicker, Button, Layout, Text, Icon, Spinner, TopNavigation, Divider, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import moment from 'moment';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import ItineraryList from "./itineraryList";
import {useTripsContext} from '@/state/ItineraryContext';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import AutocompleteList from './AutocompleteList';


const dateService = new MomentDateService();

const styles = StyleSheet.create({
	formContainer: {
		flexDirection: 'column',
		flex: 1,
	},
	formElement: {
		marginBottom: 8,
	},
	indicator: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateContainer: {
		minHeight: 50,
	}
});



const CreateForm = () => {
	const { state, dispatch } = useTripsContext();
  const [destinationInput, setDestinationInput] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [range, setRange] = React.useState({});
  const [loading, setLoading] = React.useState(false); 
  const [currentTrip, setCurrentTrip] = React.useState(null); 
  
	const LoadingIndicator = (props) => (
		<View style={[props.style, styles.indicator]}>
			<Spinner />
		</View>
	);
	

	const onGenerateWithAi = async () => {
		if(range.startDate == null || range.endDate == null || destinationInput.trim() == '')
			return;
		setLoading(true);
		try {
			const token = await getAuth().currentUser.getIdToken(/* forceRefresh */ true)
			const numberOfDays = range.endDate.diff(range.startDate, 'days') + 1;
			const body = {
				destination: destinationInput,
				days: numberOfDays
			}
			console.log(body)
			const headers = {
				'Content-Type': 'application/json',
				'Authorization': token
			};
			const res = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/itinerary`, body, {
				headers: headers
			})
			console.log(res.data);
			const tripObject = {
				id: uuidv4(),
				name: body.destination + " Trip",
				startDate: range.startDate.toISOString(),
				endDate: range.endDate.toISOString(),
				itinerary: res.data
			}
			dispatch({ type: 'ADD_TRIP', payload: tripObject })
			setCurrentTrip(tripObject);
		}
		catch(err) {
			console.log(err.message)
		}
		finally {
			setDestination(null)
			setLoading(false);
		}
	}

	const onAutocompleteSelect = (value) => {
		setDestination(value);
		setDestinationInput(value);
		Keyboard.dismiss();
	}

  return (
    <Layout style={styles.formContainer}>
			<TopNavigation 
			title={props => <Text {...props} style={[props.style, { fontSize: 22, fontWeight: "bold" }]}>Voyagr</Text>}/>
			<Divider />
			<Layout style={{padding: 8}}>
				<Text category='h3'>Plan your vacation</Text>
				<Text style={styles.formElement} category='p1'>Just type in your dream destination, planned dates and let AI do the planning for you.</Text>
			{/* Destination Input */}
			<Layout style={styles.formElement}>
				<Input
						placeholder='Your Destination 🌴'
						value={destinationInput}
						onChangeText={nextValue => setDestinationInput(nextValue)}
					/>
					<AutocompleteList textQuery={destinationInput} onItemSelect={onAutocompleteSelect}/>
			</Layout>
				

				{/* Calender element */}
				<Layout
				style={styles.dateContainer}
				level='1'
				>
					<RangeDatepicker
						range={range}
						placeholder='Travel Dates 📅'
						onSelect={nextRange => setRange(nextRange)}
						dateService={dateService}
						min={moment()}
						style={styles.formElement}
					/>
				</Layout>
				
				<Button 
					style={styles.formElement} 
					onPress={onGenerateWithAi} 
					accessoryLeft={loading ? LoadingIndicator : null}
					disabled={loading}>
				{loading ? "Planning your trip..." : "🪄 Generate with AI"}
				</Button>
				{/* <Button
					style={styles.formElement}
					appearance='outline'
				>
					Make Yourself
				</Button> */}
			{/* Itinerary element */}
				{
					currentTrip && (<ItineraryList trip={currentTrip} />)
				}
			</Layout>
			
			
  </Layout>
  	
  );

};

export default CreateForm;