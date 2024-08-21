import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import {
  ref,
  set,
  getDatabase,
  onValue,
  get,
  child,
  update,
  remove,
  push,
  onChildAdded, onChildChanged, onChildRemoved
} from "firebase/database";
import { app } from "../firebaseConfig";

export default function Main() {
  const db = getDatabase(app);
  const dbRef = ref(db);
  function writeUserData() {
    set(ref(db, "users"), {
      username: "Talha",
      email: "shiekh@gmail.com",
    });
  }

  // const userChangeRef = ref(db, "users");
  // onValue(
  //   userChangeRef,
  //   (snapshot) => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       console.log("Data:" + data);
  //     }
  //   },
  //   {
  //     // onlyOnce:true
  //   }
  // );

  function getData() {
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateData() {
    const usersRef = ref(db, "users");
    update(usersRef, {
      username: "Shiekh",
    });
  }

  function deleteData() {
    const usersRef = ref(db, "users/username");
    remove(usersRef);
  }

  const usersRef = ref(db, "users");
  function pushData() {
    const usersPostRef = push(usersRef);
    set(usersPostRef, {
      username: "PushedUser",
    });
  }

  // let count = 0;

  // const unsubscribe = onChildAdded(usersRef, (data) => {
  //   console.log(`Childs Added ${count++} times`)
  // });
  
  // onChildChanged(usersRef, (data) => {
  //   console.log("Childs Changed")
  // });

  // onChildRemoved(usersRef, (data) => {
    // console.log("Childs Removed")
  // });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Learning RealTimeDataBase</Text>
      <CustomButton title="Write Data" onPress={writeUserData} />
      <CustomButton title="Get Data" onPress={getData} />
      <CustomButton title="Update Data" onPress={updateData} />
      <CustomButton title="Delete Data" onPress={deleteData} />
      <CustomButton title="Push Data" onPress={pushData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  text: {
    fontSize: 30,
  },
});
