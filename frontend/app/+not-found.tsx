import { Layout, Text } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import {Link} from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oopsy Daisy!' }} />
      <Layout style={styles.container}>
        <Text category='h1'>This screen doesn't exist.</Text>
        <Link replace href="/" style={styles.link}>
          <Text >Go to home sdsdsd!</Text>
        </Link>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
