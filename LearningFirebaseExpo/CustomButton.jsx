import { Button, View, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.button}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default CustomButton;
