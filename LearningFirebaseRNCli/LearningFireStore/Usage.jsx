import {Button, StyleSheet, Text, View} from 'react-native';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {CustomButton} from '../CustomButton';

export default function Main() {
  const usersCollection = firestore().collection('Users');

  async function getCollection() {
    const collection = await usersCollection.get();
    // console.log("Size of Documents",collection.size)
    collection.forEach(documentSnapshot => {
      if (!documentSnapshot.exists) return;
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  }
  async function getDocument() {
    const document = await usersCollection.doc('1').get();
    console.log(document);
  }

  // function onResult(QuerySnapshot) {
  //   console.log('Got Users collection result.');
  // }

  // function onError(error) {
  //   console.error(error);
  // }

  // const unsubscribe = usersCollection.onSnapshot(onResult, onError);

  async function handleFilterUsers() {
    try {
      // const filterResults =  await firestore().collection("Users").where("name","in",["Talha","Shiekh"]).get();
      // filterResults.forEach(snapshot => {
      //   if(snapshot.exists){
      //     console.log(snapshot.data())
      //     console.log("Data Exists");
      //   }else {
      //     console.log("Data does not Exists")
      //   }
      // })

      console.log('-------------------------------');

      const snapshot = await firestore()
        .collection('Users')
        .where('age', '>=', 10)
        // .where(Filter.and(Filter('name', '==', 'Talha'),Filter('age', '>=', 18)))
        // .limit(2)
        .orderBy('age', 'desc')
        .endAt(19)
        .get();

      snapshot.forEach(snap => {
        if (snap.exists) {
          console.log(snap.data());
        }
      });
    } catch (error) {
      console.error(error);
    }
  }


  async function handleAddData() {
    console.log('-------------------------------');
    try {
     await firestore()
        .collection('Users')
        .add({
          name: 'Nothing',
          age: 16,
        });
      console.log("User Added")
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateData() {
    console.log('-------------------------------');
    try {
     await firestore()
        .collection('Users').doc("1")
        .update({
          name: 'Nothing',
          age: 16,
        });
      console.log("User Updated")
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteData(){
    console.log('-------------------------------');
    try {
     await firestore()
        .collection('Users').doc("2")
        .delete()
      console.log("User Deleted")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <CustomButton title="Add Data" onPress={handleAddData} />
      <CustomButton title="Update Data" onPress={handleUpdateData} />
      <CustomButton title="Delete Data" onPress={handleDeleteData} />
      <CustomButton title="Get Collection" onPress={getCollection} />
      <CustomButton title="Get Document" onPress={getDocument} />
      <CustomButton title="Filter Users" onPress={handleFilterUsers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 35,
  },
});
