import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function Main() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '395283591738-3ge9hkiasn00sigcrj30fqaliqim8aqk.apps.googleusercontent.com',
    iosClientId: '395283591738-7hci0m2n9qe8df7rtldsddo99a4akk5f.apps.googleusercontent.com',
    androidClientId: '395283591738-3undoj30uq9kqmsa1q74hgv3uibvpiav.apps.googleusercontent.com',
    webClientId: '395283591738-3ge9hkiasn00sigcrj30fqaliqim8aqk.apps.googleusercontent.com',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
      {user && <Text>Welcome {user.displayName}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
