import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {authorize} from 'react-native-app-auth';
import { CustomButton } from '../CustomButton';

const config = {
  clientId: 'Ov23lixFIvS7HvTJZpVm', // Replace with your GitHub Client ID
  clientSecret: '85f3ab5b15c0a63dc11abfff159f1dade6cc1750', // Replace with your GitHub Client Secret
  redirectUrl: 'com.myapp.auth://callback', // Replace with your custom URL scheme
  scopes: ['identity'], // Specify scopes as needed
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  },
};

const HandleGitHubLogin = async () => {
  try {
    const result = await authorize(config);
    console.log(result);
    Alert.alert('Login Successful', `Access Token: ${result.accessToken}`);
    // result includes accessToken, refreshToken, and other data
  } catch (error) {
    console.error(error);
    Alert.alert('Login Failed', 'An error occurred during login.');
  }
};

const GithubAuth = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login with GitHub</Text>
    <CustomButton title="Login with GitHub" onPress={HandleGitHubLogin} />
  </View>
  )
}

export default GithubAuth

const styles = StyleSheet.create({})