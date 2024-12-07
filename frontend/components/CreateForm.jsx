import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, RangeCalendar, Button, Layout, Text, Icon, Spinner } from '@ui-kitten/components';
import moment from 'moment';
import axios from 'axios';

const styles = StyleSheet.create({
	formContainer: {
		flexDirection: 'column',
		flex: 1
	},
	formElement: {
		marginBottom: 8,
		flexDirection: 'row',
		justifyContent:'center'
	},
	indicator: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});



const CreateForm = () => {

  const [value, setValue] = React.useState('');
  const [range, setRange] = React.useState({});
  const [calenderOpen, setCalenderOpen] = React.useState(false); 
  const [loading, setLoading] = React.useState(false); 
  
	const LoadingIndicator = (props) => (
		<View style={[props.style, styles.indicator]}>
			<Spinner />
		</View>
	);
	

	const onGenerateWithAi = async () => {
		setLoading(true);
		try {
			const res = await axios.get(process.env.EXPO_PUBLIC_ITINERARY_API)
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
			<Input 
					onFocus={e => setCalenderOpen(true)} 
					onBlur={e => setCalenderOpen(false)}
					placeholder='Travel Dates 📅'
					value = {moment(range.startDate).format("MMMM Do YYYY") +" -> " + moment(range.endDate).format("MMMM Do YYYY")}
					style={styles.formElement}

			/>    
			{calenderOpen &&
			(<RangeCalendar
					range={range}
					onSelect={nextRange => setRange(nextRange)}
				/>)}
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
  </Layout>
  );

};

export default CreateForm;