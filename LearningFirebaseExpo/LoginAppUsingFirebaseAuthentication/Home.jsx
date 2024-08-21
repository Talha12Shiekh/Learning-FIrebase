import { View, Text ,Image,Button,StyleSheet,ToastAndroid} from "react-native";
import { deleteUser, getAuth, signOut } from "firebase/auth";

const Home = ({navigation}) => {
  const auth = getAuth();
  const {email,displayName,photoURL} = auth.currentUser;
  const user = auth.currentUser;

  function handleUpdateEmail(){
    navigation.navigate("UpdateEmailScreen",{email})
  }
  function handleUpdatePassword(){
    navigation.navigate("UpdatePasswordScreen")
  }

  function handleDeleteUser(){
    deleteUser(user).then(() => {
      ToastAndroid.showWithGravity(
        "User Deleted",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      navigation.goBack()
    }).catch((error) => {
      console.log(error)
    });
  }

  async function handleSignOut(){
    try {
      await signOut(auth)
      ToastAndroid.showWithGravity(
        "User Signed Out",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={photoURL} />
      </View>
      <Text style={styles.text}>
        {displayName} signed in with {email}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Update Email" onPress={handleUpdateEmail} />
        <Button title="Update Password" onPress={handleUpdatePassword} />
        <Button title="Delete" onPress={handleDeleteUser} />
        <Button title="Sign out" onPress={handleSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default Home;
