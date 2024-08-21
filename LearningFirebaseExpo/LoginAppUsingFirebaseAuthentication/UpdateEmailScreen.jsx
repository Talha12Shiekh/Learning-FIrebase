import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";

const UpdateEmailScreen = ({ route, navigation }) => {
  const auth = getAuth();
  const { email } = route.params;
  const [value, setvalue] = useState(email);
  const [error, seterror] = useState(false);

  const handleUpdateEmail = () => {
    // ! Pending
    
  };

  function handleVerifyEmail() {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new email"
        keyboardType="email-address"
        value={value}
        onChangeText={(t) => setvalue(t)}
      />
      <Button title="Update Email" onPress={handleUpdateEmail} />
      <View style={{ marginTop: 10 }}>
        <Button title="Verify Email" onPress={handleVerifyEmail} />
      </View>
      {error ? <Text style={styles.error}> Verify Your Email </Text> : null}
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

export default UpdateEmailScreen;
