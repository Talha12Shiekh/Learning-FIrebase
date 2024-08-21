import {
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  ToastAndroid
} from "react-native";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";

const SignInModal = ({navigation}) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const auth = getAuth(app);

  const handleSignIn = () => {
    if (signInEmail === "" || signInPassword === "") {
      Alert.alert("Error", "Please enter both email and password.");
    } else {
      signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          ToastAndroid.showWithGravity(
            'User Logged in Successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );  
          navigation.navigate("Home",{email:user.email})
        })
        .catch((error) => {
          ToastAndroid.showWithGravity(
            'User with this email or password does not exists',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        })
        .finally(() => {
          setSignInEmail("");
          setSignInPassword("");
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={signInEmail}
        onChangeText={t => setSignInEmail(t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={signInPassword}
        onChangeText={p => setSignInPassword(p)}
      />
      <Button title="Sign Up" onPress={handleSignIn} />
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
export default SignInModal;
