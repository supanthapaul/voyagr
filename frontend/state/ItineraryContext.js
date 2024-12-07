import React, { createContext, useContext, useReducer } from 'react';
import moment from 'moment'

const TripsContext = createContext();

const sampleTrip = {
	id: 'sdsdsd',
	name: 'Thailand Trip',
	startDate: moment().toISOString(),
	endDate: moment().add(3, 'days').toISOString(),
	itinerary: [
		{
			activities: ["Visit the Howrah Bridge", "Explore the Victoria Memorial"],
			highlight: "Culture and serenity"
		},
		{
			activities: ["Visit the Howrah Bridge", "Explore the Victoria Memorial"],
			highlight: "Culture and serenity"
		},
	]
}
const initialState = {
  trips: [sampleTrip],
};

const tripsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export const TripsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripsReducer, initialState);

  return (
    <TripsContext.Provider value={{ state, dispatch }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => useContext(TripsContext);