import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';

const Main = () => {
    const [credentials,setcredentials] = useState({
        name:"",
        email:"",
        password:""
    });

    const {name,email,password} = credentials;

    function handleChange(name,value){
        setcredentials(prev => ({
            ...prev,
            [name]:value
        }))
    }

    useEffect(() => {

        const subscriber = auth().onAuthStateChanged((user) => {
            console.log("-------------------------------")
            console.log(user)

        });
        return subscriber; // unsubscribe on unmount
      }, []);
    

    function handleSignUp(){
        auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
    }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Sign Up</Text>
    <TextInput
      style={styles.input}
      placeholder="Name"
      placeholderTextColor={"grey"}
      keyboardType="text"
      value={name}
      onChangeText={(t) => handleChange("name", t)}
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      keyboardType="email-address"
      placeholderTextColor={"grey"}
      value={email}
      onChangeText={(t) => handleChange("email", t)}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor={"grey"}
      secureTextEntry
      value={password}
      onChangeText={(t) => handleChange("password", t)}
    />
    <Button title="Sign Up" onPress={handleSignUp} />
  </View>
  )
}

export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: "#f5f5f5",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
      color:"black"
    },
    input: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      color:"black"
    },
    error: {
      color: "red",
      textAlign: "center",
      marginTop: 10,
    },
    signInText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
    },
    signInButton: {
      color: "blue",
      textDecorationLine: "underline",
    },
  });