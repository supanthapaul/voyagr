import React, { createContext, useContext, useReducer, useEffect } from 'react';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripsContext = createContext();

// const sampleTrip = {
// 	id: 'sdsdsd',
// 	name: 'Thailand Trip',
// 	destination: 'Kolkata',
// 	startDate: moment().toISOString(),
// 	endDate: moment().add(3, 'days').toISOString(),
// 	itinerary: [
// 		{
// 			activities: ["Visit the Howrah Bridge", "Explore the Victoria Memorial"],
// 			highlight: "Culture and serenity"
// 		},
// 		{
// 			activities: ["Visit the Howrah Bridge", "Explore the Victoria Memorial"],
// 			highlight: "Culture and serenity"
// 		},
// 	]
// }
const initialState = {
	theme: "dark",
  trips: null,
};

const tripsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRIP':
      return {
        ...state,
        trips: [...state.trips, action.payload]
      };
    case 'SET_TRIPS':
      return {
				...state,
        ...action.payload,
      };
    case 'REMOVE_TRIP':
      return {
        ...state,
        trips: state.trips.filter(trip => trip.id !== action.payload),
      };
		case 'SET_THEME':
			return {
				...state,
				theme: action.payload == "dark" ? "dark" : "light"
			};
    default:
      return state;
  }
};

export const TripsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripsReducer, initialState);

  useEffect(() => {
    if (state.trips != null) {
      AsyncStorage.setItem('VOYAGR::TRIPS_STATE', JSON.stringify(state));
    }
  }, [state.trips]);

  useEffect(() => {
    AsyncStorage.getItem('VOYAGR::TRIPS_STATE').then((value) => {
      if (value) {
        dispatch({ type: 'SET_TRIPS', payload: JSON.parse(value) })
      }
    });
  }, []);

  return (
    <TripsContext.Provider value={{ state, dispatch }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => useContext(TripsContext);