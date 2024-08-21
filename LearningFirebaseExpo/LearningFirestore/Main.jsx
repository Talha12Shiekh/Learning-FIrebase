import { StyleSheet, Text, View, Button } from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import CustomButton from "../CustomButton";

export default function Main() {
  async function addDocument() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        middle: "Mathison",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getAllData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.data()}`);
    });
  }

  const firstDoc = doc(db, "users/8-7-24");
  async function writeDoc() {
    const data = {
      first: "Ada",
      last: "Lovelace",
      middle: "Mathison",
      born: 1815,
    };
    await setDoc(firstDoc, data, { merge: true }); // document write karay ga agr wo exist karti hai agr pehlay koi exists karti hai to us ko completey overwrite karday ga
    // updateDoc(firstDoc, data) // sirf naya data overwrite karay ga or agr already exist nai karti to error throw karay ga
  }

  async function readSingleDocument() {
    const docSnap = await getDoc(firstDoc);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      console.log(JSON.stringify(docData));
    }
  }

  let documentUnsubscribeWhenUsed;

  async function ListenChange() {
    documentUnsubscribeWhenUsed = onSnapshot(firstDoc, (documentsnapshot) => {
      if (documentsnapshot.exists()) {
        const docData = documentsnapshot.data();
        console.log(JSON.stringify(docData));
      }
    });
  }

  function WhenUsedTheDocument() {
    documentUnsubscribeWhenUsed();
  }

  // WhenUsedTheDocument()

  // ListenChange()

  async function QueryDocuments() {
    const nameQuery = query(
      collection(db, "users"),
      where("first", "==", "Ada"),
      orderBy("born"),
      limit(2)
    );

    unsubscribeQueries = onSnapshot(nameQuery,(snapshot) => {
      snapshot.docs.map(doc => console.log(doc.data()))
    })

    const queriedDocuments = await getDocs(nameQuery);
    // queriedDocuments.forEach((snap) => {
    //   console.log(snap.data());
    // });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Learning Firestore</Text>
      <CustomButton title="Add Document" onPress={addDocument} />
      <CustomButton title="Get All Data" onPress={getAllData} />
      <CustomButton title="Write doc" onPress={writeDoc} />
      <CustomButton title="Read Single Document" onPress={readSingleDocument} />
      <CustomButton title="Query Documents" onPress={QueryDocuments} />
      {/* <CustomButton title="Listen Change To Document" onPress={ListenChange} /> */}
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
