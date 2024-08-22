import {FlatList, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Appbar,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';


const TodoApp = () => {
  const todosReference = firestore().collection('todos');
  const [value, setvalue] = useState('');
  const [todos, setitems] = useState([]);
  const [loading,setloading] = useState(true)


  useEffect(() => {
    return todosReference.onSnapshot(snapshot => {
      let items = []
      snapshot.forEach(snap => {
        items.push({
          ...snap.data(),
          id:snap.id
        })
      })
      setitems(items)
      setloading(false)
    })
  },[])

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  async function handleAddTodo() {
    await todosReference.add({todo: value, completed: false});
    setvalue('');
    ToastAndroid.show('Todo Added Successfully', ToastAndroid.LONG);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={{color:"black"}}>{item.todo}</Text>}
      />
      <TextInput label={'New Todo'} value={value} onChangeText={setvalue} />
      <Button onPress={handleAddTodo}>Add TODO</Button>
    </View>
  );
};

export default TodoApp;
