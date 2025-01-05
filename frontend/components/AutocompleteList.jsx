import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem, Text } from '@ui-kitten/components';
import { getAuth } from "firebase/auth";
import axios from 'axios';

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const AutocompleteList = ({textQuery, searchType, onItemSelect}) => {
	const [autocompleteList, setAutocompleteList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentlySelected, setCurrentlySelected] = useState("");

	const fetchAutocomplete = async (searchQuery) => {
		searchQuery = textQuery.trim();
		if(searchQuery.length < 3 || currentlySelected == searchQuery)
			return;
		setLoading(true);
		try {
			//const token = await getAuth().currentUser.getIdToken(/* forceRefresh */ true);
			const headers = {
				'Content-Type': 'application/json'
			};
			const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/autocomplete`, {
				params: {
					searchText: searchQuery,
					searchType: searchType
				},
				headers
			})
			
			console.log(response.data)
			setAutocompleteList(response.data)
		}
		catch(err) {
			console.log(err)
		}
		finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		fetchAutocomplete(textQuery);

	}, [textQuery])

	const onListItemSelect = (value) => {
		onItemSelect(value);
		setCurrentlySelected(value);
		setAutocompleteList([]);
	}

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.address_line1}`}
      description={`${item.address_line2}`}
			onPress={e => onListItemSelect(item.address_line1)}
    />
  );

  return (
		<>
			{loading && (<>
				<Text>Loading...</Text>
			</>)}
			{(!loading && autocompleteList) && (<>
				<List
					style={styles.container}
					data={autocompleteList}
					ItemSeparatorComponent={Divider}
					renderItem={renderItem}
					keyboardShouldPersistTaps={true}
				/>
			</>)}
		</>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});

export default AutocompleteList;