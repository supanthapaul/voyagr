import { SafeAreaView, View, StyleSheet } from "react-native";
import {Link} from 'expo-router';
import { Icon, IconElement, Text, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import CreateForm from "@/components/CreateForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import LoginPage from "../components/loginPage";
import app, {auth} from '@/firebaseConfig';


export default function Index() {
	const [user, setUser] = useState(null);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 8
		},
  });

  useEffect(() => {
	console.log("subscribing to auth state changes");
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			setUser(user);
			// ...
		} else {
			// User is signed out
			// ...
			setUser(null);
		}
	});
  }, []);

  return (
		<SafeAreaView style={{ flex: 1 }}>
			<Layout style={styles.container}>
				{user != null ? (<CreateForm />) : (<LoginPage />)}
				
			</Layout>
		</SafeAreaView>
  );
}
