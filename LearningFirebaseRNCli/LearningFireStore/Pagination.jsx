import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { CustomButton } from '../CustomButton';

const userCollection = firestore().collection('Users');

const Main = () => {
  const [lastDocument, setLastDocument] = useState();
  const [userData, setUserData] = useState([]);

  function MakeUserData(docs) {
    let templist = [...userData]; //[...userData] <- use this instead of [] if you want to save the previous data.
    docs.forEach((doc, i) => {
      let temp = (
        <View key={i} style={{ margin: 10 }}>
          <Text>{doc._data.name}</Text>
          <Text>{doc._data.age}</Text>
        </View>
      );
      templist.push(temp)
    });
    setUserData(templist); //replace with the new data
  }

   function LoadData() {
    console.log('LOAD');
    let query = userCollection.orderBy('age'); // sort the data
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument); // fetch data following the last document accessed
      console.log(query)
    }
    query.limit(1) // limit to your page size, 3 is just an example
        .get()
        .then(querySnapshot => {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
          MakeUserData(querySnapshot.docs);
        });
    }

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      {userData}
      <CustomButton
        onPress={() => {
          LoadData();
        }}
        title="Load Next"
      />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({})