import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const Main = () => {
  const db = getFirestore(app);
  const [todos, settodos] = useState([]);
  const [loading, setloading] = useState(true);
  const inputRef = useRef(null);
  const [value, setvalue] = useState("");
  const [updateTodo, setupdateTodo] = useState(false);
  const [edititemdata, setedititemdata] = useState({
    isEditing: false,
    editId: null,
  });

  async function getDataBase() {
    setloading(true);
    try {
      const reference = collection(db, "todos");
      const todos = await getDocs(reference);

      const newTodos = todos.docs.map((item) => item.data());
      settodos(newTodos);
    } catch (er) {
      console.log(er);
    } finally {
      setloading(false);
    }
  }

  async function getMaxId() {
    try {
      const reference = collection(db, "todos");
      const todosSnapshot = await getDocs(reference);
      const ids = todosSnapshot.docs.map(doc => parseInt(doc.id));
      return ids.length > 0 ? Math.max(...ids) : 0;
    } catch (error) {
      console.log("Error fetching max ID: ", error);
      return 0;
    }
  }
  

  async function addTodo() {
    setvalue("");
    try {
      const maxId = await getMaxId();
      const newId = maxId + 1;
      await setDoc(doc(db, "todos", `${newId}`), {
        value,
      });
      await getDataBase();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getDb = async () => {
      await getDataBase();
    }
    getDb();
  },[])

  const Loading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color="primary" />
      </View>
    );
  };

  function handleDeleteItem(index, { value }) {
    Alert.alert("Delete Item", `Are you sure you want to delete ${value}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "todos", `${index}`));
            await getDataBase();
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  }

  function handleEditItem(ind, item) {
    setedititemdata({
      isEditing: true,
      editId: ind,
    });
    setvalue(item.value);
    inputRef?.current?.focus();
  }

  async function handleEditTodo() {
    setupdateTodo(true);
    try {
      const editingDoc = doc(db, "todos", `${edititemdata.editId}`);
      await setDoc(editingDoc, { value }, { merge: true });
      await getDataBase();
      setupdateTodo(false);
    } catch (err) {
      console.log(err);
    }

    setedititemdata({
      isEditing: false,
      editId: null,
    });
    setvalue("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={value}
        onChangeText={(v) => setvalue(v)}
        ref={inputRef}
      />
      {!edititemdata.isEditing ? (
        <Button title="Add Todo" onPress={addTodo} />
      ) : (
        <TouchableOpacity onPress={handleEditTodo}>
          <View style={styles.editBtn}>
            {!updateTodo ? (
              <Text style={styles.editText}>Edit Todo</Text>
            ) : (
              <ActivityIndicator size={"large"} color="primary" />
            )}
          </View>
        </TouchableOpacity>
      )}
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={todos}
          renderItem={({ item, index }) => (
            <View style={styles.todoContainer}>
              <View>
                <Text style={styles.todo}>{item.value}</Text>
              </View>
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(index, item)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEditItem(index, item)}
                  style={styles.deleteButton}
                >
                  <Text style={[styles.deleteText, { color: "green" }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.todoList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  todo: {
    fontSize: 18,
    flex: 1, // Take up space but allow button to be aligned to the right
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  todoList: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnsContainer: {
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  editBtn: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    padding: 10,
  },
  editText: {
    color: "white",
    textAlign: "center",
  },
});

export default Main;
