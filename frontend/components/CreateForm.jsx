import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Input, RangeCalendar, Button, Layout } from '@ui-kitten/components';
import moment from 'moment';


const CreateForm = () => {

  const [value, setValue] = React.useState('');
  const [range, setRange] = React.useState({});
  const [calenderOpen, setCalenderOpen] = React.useState(false); 
  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    button: {
      margin: 8,
      flex: "1 0",
      
    },
  });

  return (
    <>
    {/* Destination Input */}
    <Input
      placeholder='Your Destination 🌴'
      value={value}
      onChangeText={nextValue => setValue(nextValue)}
    />

    {/* Calender element */}
    <Input 
        onFocus={e => setCalenderOpen(true)} 
        onBlur={e => setCalenderOpen(false)}
        placeholder='Travel Dates 📅'
        value = {moment(range.startDate).format("MMMM Do YYYY") +" -> " + moment(range.endDate).format("MMMM Do YYYY")}
    />    
    {calenderOpen &&
    (<RangeCalendar
        range={range}
        onSelect={nextRange => setRange(nextRange)}
      />)}

    {/* Button elements */}  
    <Layout
    style={styles.buttonContainer}
    level='1'
  >
    <Button style={styles.button}>
      Generate with AI
    </Button>
    <Button
      style={styles.button}
    >
      Make Yourself
    </Button>

  </Layout>

  </>
  );

};

export default CreateForm;