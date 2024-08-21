import { Button, StyleSheet, Text, TextInput, View ,ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { getAuth, updatePassword ,sendPasswordResetEmail } from "firebase/auth";

const UpdatePasswordScreen = ({navigation}) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [npassword,setnpassword] = useState("")

    function handleUpdatePassword(){
        updatePassword(user, npassword).then(() => {
            ToastAndroid.showWithGravity(
                "Password updated Successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              navigation.goBack()
          }).catch((error) => {
            ToastAndroid.showWithGravity(
                "Unable to update your password",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
          });
    }

    function handleResetPassword(){
        sendPasswordResetEmail(auth, user.email)
        .then(() => {
            ToastAndroid.showWithGravity(
                "WE have sent a verification link to your email",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              
        }).then(() => {
            ToastAndroid.showWithGravity(
                "Password Updated Successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );

        }).then(() => {
            navigation.goBack()
        })
        .catch((error) => {
            ToastAndroid.showWithGravity(
                "We could not update your password",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              navigation.goBack()
        });
      
    }

    // Bhai 
    // Bhai@gmail.com
    // Nice_123

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Pasword</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new Password"
        // keyboardType="email-address"
        value={npassword}
        onChangeText={np => setnpassword(np)}
      />
      <Button title="Update Password" onPress={handleUpdatePassword} />
      <View style={{ marginTop: 10 }}>
        <Button title="Reset Password" onPress={handleResetPassword} />
      </View>
    </View>
  )
}

export default UpdatePasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});