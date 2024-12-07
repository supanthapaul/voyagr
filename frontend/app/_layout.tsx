import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, TopNavigation, IconRegistry } from '@ui-kitten/components';
import { useState } from "react";
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [theme, setTheme] = useState(eva.dark);
  const headerOptions = {
    headerTintColor: theme === eva.dark ? '#eee' : '#282828',
		headerStyle: {
      backgroundColor: theme === eva.dark ? '#060028' : '#e0e0e0',
							
    }
  };
  return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={theme}>
				<Stack>
					<Stack.Screen name="index" options={
						{ title: 'Voyagr', 
							...headerOptions
							}}/>
					<Stack.Screen name="hello" />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style={theme === eva.dark ? "light" : "dark"}/>
			</ApplicationProvider>
		</>
    
  );
}
