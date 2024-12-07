import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, RangeDatepicker, Button, Layout, Text, Icon, List, ListItem } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import moment from 'moment';
import { Link, router  } from 'expo-router';
import {useTripsContext} from '@/state/ItineraryContext';

const dateService = new MomentDateService();

const styles = StyleSheet.create({
	formContainer: {
		flexDirection: 'column',
		flex: 1
	},
	formElement: {
		marginBottom: 8,
	},
	listContainer: {
  },
	dateContainer: {
		minHeight: 50,
	}
});

const HistoryScreen = () => {
	const { state, dispatch } = useTripsContext();

	const renderItemAccessory = (id) => (
    <Button 
			size='tiny' 
			status='danger'
			onPress={e => dispatch({type: 'REMOVE_TRIP', payload: id})}
			accessoryLeft={renderItemIcon} />
  );

  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='trash-2-outline'
    />
  );

  const renderItem = ({ item, index }) => (
		<ListItem
			title={`${item.name}`}
			key={item.id}
			onPress={e => router.navigate({pathname: '/[id]', params: {id: item.id}})}
			description={`${moment(item.startDate).format("MMM Do, YYYY")} To ${moment(item.endDate).format("MMM Do, YYYY")}`}
			accessoryRight={() => renderItemAccessory(item.id)}
			/>
    
  );

  return (
    <Layout style={styles.formContainer}>
			<Text category='h3'>History</Text>
			<List
				style={styles.listContainer}
				data={state.trips}
				renderItem={renderItem}
			/>
  </Layout>
  );

};

export default HistoryScreen;