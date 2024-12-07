import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text, Spinner } from '@ui-kitten/components';
import { getAuth, signInAnonymously } from "firebase/auth";


const LoginPage = () => {

  const loginAnonymously = () => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      console.log("Signed in successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
      // ...
    });
  }

  useEffect(() => {
    loginAnonymously();
  }, []);
  const styles = StyleSheet.create({
		formContainer: {
			flexDirection: 'row',
			flex: 1
		},
    formElement: {
      marginBottom: 8,
			flexDirection: 'row',
			justifyContent:'center'
    },
  });

  return (
    <Layout style={styles.formContainer}>
      <Spinner />
    <Text category='h3'> Initializing Login </Text>
  </Layout>
);
};

export default LoginPage;