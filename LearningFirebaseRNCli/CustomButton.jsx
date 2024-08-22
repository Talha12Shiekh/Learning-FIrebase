import {Button, StyleSheet, View} from 'react-native';

export const CustomButton = ({title, onPress}) => {
  return (
    <View style={styles.button}>
      <Button 
      title={title}
      onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    button:{
        marginTop:10
    }
})
