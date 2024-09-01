import {Text, TextInput, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomButton} from '../CustomButton';
import auth from '@react-native-firebase/auth';

const PhoneAuth = () => {
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const [authenticated, setauthenticated] = useState(false);

  function onAuthStateChanged(user) {
    if (user) {
        setauthenticated(true)
        console.log("-----------------------------")
        console.log(new Date(Date.now()).getTime())
        console.log("User generated")
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        console.log(confirmation)
        setConfirm(confirmation);
        ToastAndroid.show("We have sent a verification code to " + phoneNumber,ToastAndroid.LONG)
    } catch (error) {
        console.log(error)
        ToastAndroid.show("We could not verify your phone number ",ToastAndroid.LONG)
    }
  }

  async function confirmCode() {
    try {
        console.log(code)
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function signOut() {
    try {
      await auth().signOut();
      setConfirm(null);
      setCode('');
      setPhoneNumber('');
      setauthenticated(false)
      ToastAndroid.show("You have been signed out.", ToastAndroid.SHORT);
    } catch (error) {
      console.log('Sign out error:', error);
      ToastAndroid.show("Error signing out. Please try again.", ToastAndroid.LONG);
    }
  }

  if (!confirm) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomButton
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+92 3214946471')}
      />
      </View>
    );
  }

  if(authenticated){
    return (
        <View>
            <CustomButton
            title={"Sign out"}
            onPress={signOut}
            />
            <Text>Home page</Text>
        </View>
    )
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput style={{borderColor:"white",borderWidth:2,padding:10,width:"80%"}} value={code} onChangeText={text => setCode(text)} />
      <CustomButton title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
};

export default PhoneAuth;
