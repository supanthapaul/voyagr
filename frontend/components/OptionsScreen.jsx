import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, RangeDatepicker, Button, Layout, Text, Icon, TopNavigation, Divider, List, RadioGroup, Radio } from '@ui-kitten/components';
import {useTripsContext} from '@/state/ItineraryContext';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
	},
	formContainer: {
		padding: 8
	},
	toggle: {
		marginBottom: 8,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		marginRight: 8

	},
	formElement: {
		marginBottom: 8,
  },
});
const themesByIndex = ["light", "dark"];
const OptionsScreen = ({ navigation, route }) => {
	const { state, dispatch } = useTripsContext();
	const [selectedIndex, setSelectedIndex] = React.useState(themesByIndex.indexOf(state.theme));
	

	useEffect(() => {
		
	}, []);

	const onThemeChange = (index) => {
		setSelectedIndex(index)
		dispatch({type: 'SET_THEME', payload: themesByIndex[index]})
	}
  return (
    <Layout style={styles.container}>
			<TopNavigation title={props => <Text {...props} style={[props.style, { fontSize: 22, fontWeight: "bold" }]}>Options</Text>}/>
			<Divider />
			{/* <Text category='h3'>History</Text> */}
			<Layout style={styles.formContainer}>
				<Text category='h6'>
					Theme
				</Text>
				<RadioGroup
					selectedIndex={selectedIndex}
					onChange={index => onThemeChange(index)}
				>
					<Radio>Aurora Light</Radio>
					<Radio>Twilight Dark</Radio>
      </RadioGroup>
			</Layout>
			
  </Layout>
  );

};

export default OptionsScreen;