import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Input, RangeCalendar, Button, Layout, Text, Icon } from '@ui-kitten/components';
import moment from 'moment';

const LoginPage = () => {
  const styles = StyleSheet.create({
		formContainer: {
			flexDirection: 'column',
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
			<Text category='h3'>Login</Text>

			<Button style={styles.formElement}>
			Login With Google
			</Button>
  </Layout>
  );

};

export default LoginPage;