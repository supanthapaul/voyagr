import { IconRegistry } from '@ui-kitten/components';
import { useState, useEffect } from "react";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {TripsProvider} from '@/state/ItineraryContext';
import HomeScreen from "@/components/HomeScreen";

export default function Index() {
  return (
		<TripsProvider>
			<IconRegistry icons={EvaIconsPack} />
			<HomeScreen />
		</TripsProvider>
    
  );
}
