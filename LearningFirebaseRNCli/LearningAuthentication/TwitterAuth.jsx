import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomButton } from '../CustomButton'
import auth from '@react-native-firebase/auth';
import { NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;

RNTwitterSignIn.init('DPZzASFvv0xHwHAsw7DVsMVeX', 'VOe4YRn7BWOwghL4MUnh1L3Xsyb8iW0XoCjUItERy7bHLJUSJm').then(() =>
  console.log('Twitter SDK initialized'),
);

const TwitterAuth = () => {

  async function onTwitterButtonPress() {
    // Perform the login request
    const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
  
    // Create a Twitter credential with the tokens
    const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(twitterCredential);
  }

  return (
    <View style={styles.container}>
     <CustomButton
     title={"Sign in with Twiiter"}
     onPress={onTwitterButtonPress}
     />
    </View>
  )
}

export default TwitterAuth

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})