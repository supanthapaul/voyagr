import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Input, RangeDatepicker, Button, Layout, Text, Icon, Spinner, TopNavigation, Divider, RadioGroup, Radio } from '@ui-kitten/components';
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
	},
	resultContainer: {
		marginTop: 36,
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center"
	},
	radioGroup: {
		flexDirection: 'row'
	}
});

const searchTypes = ['city', 'state', 'country'];

const CreateForm = ({ navigation, route }) => {
	const { state, dispatch } = useTripsContext();
  const [destinationInput, setDestinationInput] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [error, setError] = React.useState('');
  const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(2);
  const [range, setRange] = React.useState({});
  const [loading, setLoading] = React.useState(false); 
  const [currentTrip, setCurrentTrip] = React.useState(null); 
  
	const LoadingIndicator = (props) => (
		<View style={[props.style, styles.indicator]}>
			<Spinner />
		</View>
	);
	

	const onGenerateWithAi = async () => {
		if(destination.trim() == '') {
			setError("Please start typing a destination above and select a valid destination from the suggestions list.");
			return;
		}
		if(range.startDate == null || range.endDate == null) {
			setError("Please select a valid date range for your trip.")
			return;
		}
		if(range.startDate.isAfter(range.endDate)) {
			setError("Start date cannot be after end date, please select a valid date range.")
			return;
		}
		setLoading(true);
		setError('');
		try {
			const token = await getAuth().currentUser.getIdToken(/* forceRefresh */ true)
			const numberOfDays = range.endDate.diff(range.startDate, 'days') + 1;
			const body = {
				destination: destination,
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
				destination: body.destination,
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
			setDestination('');
			setDestinationInput('');
			setLoading(false);
		}
	}

	const onAutocompleteSelect = (value) => {
		setDestination(value);
		setDestinationInput(value);
		Keyboard.dismiss();
	}

	const redirectToTripDetails = (e) => {
		if(!currentTrip) return;
		navigation.navigate('Details', {id: currentTrip.id})
	}

  return (
    <Layout style={styles.formContainer}>
			<TopNavigation 
			title={props => <Text {...props} style={[props.style, { fontSize: 22, fontWeight: "bold" }]}>Voyagr</Text>}/>
			<Divider />
			<Layout style={{padding: 8, height: "100%"}}>
				<Text category='h3'>Plan your vacation</Text>
				<Text style={styles.formElement} category='p1'>Just type in your dream destination, planned dates and let AI do the planning for you.</Text>
			{/* Destination Input */}
			<Layout style={styles.formElement}>
				<Text category='h6'>I'm visiting a,</Text>
				<RadioGroup
					style={styles.radioGroup}
					selectedIndex={selectedTypeIndex}
					onChange={index => setSelectedTypeIndex(index)}
				>
					<Radio>City</Radio>
					<Radio>State</Radio>
					<Radio>Country</Radio>
				</RadioGroup>
			</Layout>
			<Layout style={styles.formElement}>
				<Input
						placeholder='Your Destination 🌴'
						value={destinationInput}
						onChangeText={nextValue => setDestinationInput(nextValue)}
					/>
					<AutocompleteList 
						textQuery={destinationInput} 
						searchType={searchTypes[selectedTypeIndex]} 
						onItemSelect={onAutocompleteSelect}/>
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
					(error && !loading) && (
					<Layout style={styles.resultContainer}>
						<Text category='h6' status='danger' style={{marginBottom: 4}}>Error!</Text>
						<Text category='p1' style={{textAlign: 'center'}}>{error}</Text>
					</Layout>
					)
				}
				{
					(currentTrip && !loading && !error) && (
					<Layout style={styles.resultContainer}>
						<Text category='h6' style={{marginBottom: 4}}>✨Your vacation itinerary is ready!✨</Text>
						<Button 
							style={styles.formElement} 
							onPress={redirectToTripDetails} 
							accessoryLeft={<Icon name="eye-outline"/>}>
								View
						</Button>
					</Layout>
					)
				}
			</Layout>
			
			
  </Layout>
  	
  );

};

export default CreateForm;