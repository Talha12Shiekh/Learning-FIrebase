import {StyleSheet, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {CustomButton} from '../CustomButton';

const GoggleAuth = () => {
  GoogleSignin.configure({
    webClientId:
      '356220666721-rokn5n60s5jq5aro4o2hlkqlvltm2k39.apps.googleusercontent.com',
  });

  const handleGoggleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoggleSignIn}
      /> */}
      <CustomButton
        title={'Sign in with goggle'}
        onPress={handleGoggleSignIn}
      />
      <CustomButton title={'Sign out with goggle'} onPress={handleSignOut} />
    </View>
  );
};

export default GoggleAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center"
  },
});
