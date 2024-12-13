import { SafeAreaView, View, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '@/firebaseConfig'

import { ApplicationProvider, Layout, Text, TopNavigation, IconRegistry } from '@ui-kitten/components';
import { useState, useEffect } from "react";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {TripsProvider} from '@/state/ItineraryContext';
import {AppNavigator} from '@/components/AppStackNavigator';
import LoginPage from "@/components/loginPage";

export default function Index() {
	const [theme, setTheme] = useState(eva.dark);
	const [user, setUser] = useState(null);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
  });

  useEffect(() => {
	console.log("subscribing to auth state changes");
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in
			const uid = user.uid;
			setUser(user);
		} else {
			// User is signed out
			setUser(null);
		}
	});
  }, []);
  const statusBarOptions = {
    backgroundColor: theme === eva.dark ? '#060028' : '#e0e0e0',
		foregroundStyle: theme === eva.dark ? "light" : "dark"
  };
  return (
		<TripsProvider>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={theme}>
				<SafeAreaView style={{ flex: 1 }}>
				<Layout style={styles.container}>
					{user != null ? (<AppNavigator />) : (<LoginPage />)}
				</Layout>
				</SafeAreaView>
				<StatusBar backgroundColor={statusBarOptions.backgroundColor} style={statusBarOptions.foregroundStyle}/>
			</ApplicationProvider>
		</TripsProvider>
    
  );
}
