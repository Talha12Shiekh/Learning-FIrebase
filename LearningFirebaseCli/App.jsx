import { useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const [count,setcount] = useState(0);
  const counterRef = useRef(null);

  function handleIncreaseCount(){
    setcount(p => p + 1);
  }

  function handleDecreaseCount(){
    if(count < 1){
      alert("Count can't be negative");
    }else {
      setcount(p => p - 1);
    }
  }

  function handleContinuousIncreaseCount(){
    if(counterRef.current == null){
    counterRef.current = setInterval(() => {
      setcount(p => p + 1)
    })
  }else {
    alert("Count already running")
  }

  }

  function handleStopCount(){
    if(counterRef.current !== null){
      clearInterval(counterRef.current);
      counterRef.current = null;
    }
    setcount(count)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.btnContainer}>
      <Button
        onPress={handleIncreaseCount}
        title="Increase Count"
      />
      <Button
        onPress={handleDecreaseCount}
        title="Decrease Count"
      />
      </View>
      <View style={styles.btnContainer}>
      <Button
        onPress={handleContinuousIncreaseCount}
        title="Start Increasing count"
      />
      <Button
        onPress={handleStopCount}
        title="Stop Count"
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  text: {
    fontSize: 100,
    color: 'black',
    fontWeight: 'bold',
  },
  btnContainer:{
    marginTop:30,
    flexDirection:"row",
    gap:10
  }
});
