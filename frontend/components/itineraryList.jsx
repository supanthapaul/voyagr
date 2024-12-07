import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, ListItem } from '@ui-kitten/components';

const data = new Array(8).fill({
  title: 'Item',
});

const itineraryList = () => {

    const tripLists = ({ item, index }) => (
        <ListItem title={`${item.title} ${index + 1}`} />
      );

      const rendertripLists = () => (
        <List
          style={styles.listContainer}
          data={data}
          renderItem={tripLists}
        />
      );
       
  const headerHighlight = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {`${info.item.title} ${info.index + 1}`}
      </Text>
      <Text>Date:20/12/20</Text>
    </View>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={(headerProps) => headerHighlight(headerProps, info)}
    >
        {rendertripLists()}
    </Card>
  );

  return (
    <> 
    <Text category='h5'> Thailand Trip Itinerary!</Text>
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
    />
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
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