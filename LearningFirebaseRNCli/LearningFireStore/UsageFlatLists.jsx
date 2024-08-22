import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Main = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(snapshot => {
        const users = [];

        snapshot.forEach(document => {
          users.push({
            ...document.data(),
            id: document.id,
          });
        });

        setUsers(users);
        setLoading(false);
        // see next step
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.text}>User ID: {item.id}</Text>
            <Text style={styles.text}>User Name: {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
  },
});

export default Main;
