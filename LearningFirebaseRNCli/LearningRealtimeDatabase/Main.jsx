import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {firebase, ref} from '@react-native-firebase/database';
import {CustomButton} from '../CustomButton';
import database from '@react-native-firebase/database'


const DB_URL =
'https://firstclifirebaseproject-default-rtdb.asia-southeast1.firebasedatabase.app/';

const Main = () => {
    const reference = firebase.app().database(DB_URL);
    reference.setPersistenceEnabled(true);

  async function handleAddData() {
    console.log("---------------------------")
    await reference.ref('/users/1').set({
      name: 'Talha shiekh',
      age: 18,
    });
    console.log('Data set.');
  }
  async function handleReadData() {
    console.log("---------------------------")
   const data =  await reference.ref("/users/1").once("value")
   console.log(data.val())
  }

  reference.ref("/users/1").on("value",data => {
    console.log("---------------------------")
    console.log(data.val())
  })

  async function handleUpdateData(){
    await reference.ref("/users/1").update({name:"Hello World",age:18})
    console.log("Data updated")
  }

  async function handlePushData() {
    const newReference = reference.ref('/users').push();

    await newReference.set({
        name:"Ali",age:20
    })    
    console.log("New User pushed")
  }

  async function handleDeleteData() {
    await reference.ref("/users/1").remove()
  }

  async function handleGoOffline(){
    await reference.goOffline()
    console.log("gone offline")
  }
  async function handleComeOnline(){
    await reference.goOnline()
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomButton title={'Add Data'} onPress={handleAddData} />
      <CustomButton title={'Read Data'} onPress={handleReadData} />
      <CustomButton title={'Update Data'} onPress={handleUpdateData} />
      <CustomButton title={'Push Data'} onPress={handlePushData} />
      <CustomButton title={'Delete Data'} onPress={handleDeleteData} />
      <CustomButton title={'Go Offine'} onPress={handleGoOffline} />
      <CustomButton title={'Come online'} onPress={handleComeOnline} />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
