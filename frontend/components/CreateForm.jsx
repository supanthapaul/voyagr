import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, RangeDatepicker, Button, Layout, Text, Icon, Spinner } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import moment from 'moment';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import ItineraryList from "./itineraryList";

const dateService = new MomentDateService();

const styles = StyleSheet.create({
	formContainer: {
		flexDirection: 'column',
		flex: 1
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

  const [value, setValue] = React.useState('');
  const [range, setRange] = React.useState({});
  const [loading, setLoading] = React.useState(false); 
  
	const LoadingIndicator = (props) => (
		<View style={[props.style, styles.indicator]}>
			<Spinner />
		</View>
	);
	

	const onGenerateWithAi = async () => {
		if(range.startDate == null || range.endDate == null || value.trim() == '')
			return;
		setLoading(true);
		try {
			const token = await getAuth().currentUser.getIdToken(/* forceRefresh */ true)
			const body = {
				destination: value,
				days: range.endDate.diff(range.startDate, 'days') + 1
			}
			console.log(body)
			const headers = {
				'Content-Type': 'application/json',
				'Authorization': token
			};
			const res = await axios.post(process.env.EXPO_PUBLIC_ITINERARY_API, body, {
				headers: headers
			})
			console.log(res.data);
		}
		catch(err) {
			console.log(err.message)
		}
		finally {
			setLoading(false);
		}
	}

  return (
    <Layout style={styles.formContainer}>
			<Text category='h3'>Plan your vacation</Text>
			<Text style={styles.formElement} category='p1'>Just type in your dream destination, planned dates and let AI do the planning for you.</Text>
    {/* Destination Input */}
			<Input
				placeholder='Your Destination 🌴'
				value={value}
				onChangeText={nextValue => setValue(nextValue)}
				style={styles.formElement}
			/>

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
			<Button
				style={styles.formElement}
				appearance='outline'
			>
				Make Yourself
			</Button>
		{/* Itinerary element */}
			<ItineraryList />
  </Layout>
  	
  );

};

export default CreateForm;