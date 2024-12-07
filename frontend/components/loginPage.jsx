import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text, Spinner } from '@ui-kitten/components';
import { getAuth, signInAnonymously } from "firebase/auth";


const LoginPage = () => {

  const loginAnonymously = () => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      console.log("Signed in successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
    });
  }

  useEffect(() => {
    loginAnonymously();
  }, []);
  const styles = StyleSheet.create({
		formContainer: {
			flexDirection: 'row',
			flex: 1,
      justifyContent:'center',
      alignItems: 'center',
		},
    formElement: {
      marginBottom: 8,
			flexDirection: 'row',
			justifyContent:'center'
    },
  });

  return (
    <Layout style={styles.formContainer}>
      <Spinner size='medium'/>
    <Text category='p1'> Setting Up... </Text>
  </Layout>
);
};

export default LoginPage;