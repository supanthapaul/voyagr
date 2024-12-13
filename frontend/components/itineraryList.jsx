import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, ListItem, Icon } from '@ui-kitten/components';
import {useTripsContext} from '@/state/ItineraryContext';
import moment from 'moment';


const itineraryList = ({trip}) => {
    useEffect(() => {
        console.log(trip)
    }, [trip]);

		const renderItemIcon = (props) => (
			<Icon
				{...props}
				name='checkmark-circle-outline'
			/>
		);
    
    const tripLists = ({ item, index }) => (
        <ListItem title={`${item}`} accessoryLeft={renderItemIcon}/>
      );

      const rendertripLists = (activities) => (
        <List
          style={styles.listContainer}
          data={activities}
          renderItem={tripLists}
        />
      );
       
  const headerHighlight = (headerProps, info, index) => (
    <View {...headerProps}>
      <Text category='h6'>
        {`${info.highlight}`}
      </Text>
      <Text>{moment(trip.startDate).add(index, 'days').format("MMM Do, YYYY")}</Text>
    </View>
  );

  const renderItem = ({item, index}) => (
    <Card
      style={styles.item}
      status='basic'
      header={(headerProps) => headerHighlight(headerProps, item, index)}
    >
        {rendertripLists(item.activities)}
    </Card>
  );

  return (
    <> 
    <Text category='h5'> {trip.name}</Text>
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={trip.itinerary}
      renderItem={renderItem}
    />
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
  },
  contentContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  listContainer: {
    maxHeight: 180,
  },
});

export default itineraryList;