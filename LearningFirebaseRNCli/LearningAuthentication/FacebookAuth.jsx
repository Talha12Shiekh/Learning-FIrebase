import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {CustomButton} from '../CustomButton';
import auth from '@react-native-firebase/auth';


const FacebookAuth = () => {

  useEffect(() => {

    const subscriber = auth().onAuthStateChanged((user) => {
        console.log("-------------------------------")
        console.log(user)

    });
    return subscriber; // unsubscribe on unmount
  }, []);

  async function onFacebookButtonPress() {

    try {
    
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    console.log("Logged in ")
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);

      
  } catch (error) {
      console.log(error)
  }
  }

  function handleSignOut(){
    LoginManager.logOut()
    console.log("User logged out")
  }

  return (
    <View style={styles.container}>
      <CustomButton
      title={"Sign in with facebook"}
      onPress={onFacebookButtonPress}
      />
      <CustomButton
      title={"Sign out"}
      onPress={handleSignOut}
      />
    </View>
  )
}

export default FacebookAuth

const styles = StyleSheet.create({
  
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})