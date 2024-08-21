import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebaseConfig";

// {"_redirectEventId": undefined, "apiKey": "AIzaSyDezJG6C_ML7-XJhcljX4YCmWdoech5_uE", "appName": "[DEFAULT]", "createdAt": "1723549939752", "displayName": undefined, "email": "tklinkedin3456@gmail.com", "emailVerified": false, "isAnonymous": false, "lastLoginAt": "1723549939752", "phoneNumber": undefined, "photoURL": undefined, "providerData": [[Object]], "stsTokenManager": {"accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYTI5YTUyMTJkOWI5NmYzNjc1NTA0ZjYyYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyc3RleHBvZ29maXJlYmFzZXByb2plY3QiLCJhdWQiOiJmaXJzdGV4cG9nb2ZpcmViYXNlcHJvamVjdCIsImF1dGhfdGltZSI6MTcyMzU0OTk0MCwidXNlcl9pZCI6InlTRjRJUWF6SFhPUDYwZ3ZoaWN4ckp3TVBZcDEiLCJzdWIiOiJ5U0Y0SVFhekhYT1A2MGd2aGljeHJKd01QWXAxIiwiaWF0IjoxNzIzNTQ5OTQwLCJleHAiOjE3MjM1NTM1NDAsImVtYWlsIjoidGtsaW5rZWRpbjM0NTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRrbGlua2VkaW4zNDU2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.X_L1TPkokU2fw7Te4d210kbX-XID95p-wgAwkHDDkZDw4zS1CtP8RR0vQZqTH1a_mJ19VPQMQEQSdKpvuBgnd6rwcAaK7gsSjOwJPyB2Aw2WtIkIta-00DmgbUd4UIaS5NS1VJwCbvEK74xJTqbRKIarvZ5_4WmJMCfWJZn02KUoPetdhfDlcYJ7oHNFHrNZfcloBOCtu9cswet09wkaJTGkjsFPRJRs9VwjB3vBfSHbOtMWrpIvpTiva8pZxyLYBPR-Phn1FrTNl0M3ga6o3ae3n5EkL0hgIO15ZtehAJ73Rx4uw0ac4Vi_wXW5SZuAOgon2Wlmmi9p_x7LGVDMkg", "expirationTime": 1723553538350, "refreshToken": "AMf-vBx_7ST4GT-kAQxo-GNn66dfeA6iiCe0_Z14757GL1BEogZ1rmWuP6HR0xxcuSUZBzOAxEgiuzLh-Mzyls5LCGh-IyHNWaI-Nqn-KTmVcVNKtQk9S61r-GC0j32gt2f6Fc0CLPSBePhMt2TYth1xo5vJ4_xAxT9v_DfcMxjkyzkVHqx4Jw4SUw4oo9z6bdOZ23LeoTty8embPm0uEeVj-USJntMp9UNnTEJR8UEeKEh7hTkjXSRdA81WWTTadhZuI-MWXiNv"}, "tenantId": undefined, "uid": "ySF4IQazHXOP60gvhicxrJwMPYp1"}

const LoginScreen = ({ navigation }) => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = credentials;

  function handleChange(name, value) {
    setcredentials((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const [error, seterror] = useState("");
  const auth = getAuth(app);

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter both email and password.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {

          ToastAndroid.showWithGravity(
            "User created Successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );


          updateProfile(user,{
            displayName: name,
            photoURL: require("./medium.webp"),
          }).then(() => {
            navigation.navigate("Home");
          })

          
          seterror("");
          setcredentials({
            name: "",
            email: "",
            password: "",
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          seterror(errorMessage);
        });
    }
  };

  // onAuthStateChanged(auth, (user) => {
    // if (user) {
      // updateProfile(user, {
      //   displayName: name,
      //   photoURL: require("./medium.webp"),
      // }).then(() => {
        // navigation.navigate("Home")
      // })
    // }
  // });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="text"
        value={name}
        onChangeText={(t) => handleChange("name", t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(t) => handleChange("email", t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(t) => handleChange("password", t)}
      />
      <Button title="Sign Up" onPress={handleLogin} />
      {error.message !== "" ? (
        <Text style={styles.error}> {error} </Text>
      ) : null}

      <Text style={styles.signInText}>
        Already have an account?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInButton}>Sign in</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

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

export default LoginScreen;
