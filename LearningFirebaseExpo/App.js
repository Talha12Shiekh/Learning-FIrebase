import SignUpScreen from "./LoginAppUsingFirebaseAuthentication/SignUp"
import SignInScreen from "./LoginAppUsingFirebaseAuthentication/SignIn"
import UpdateEmailScreen from "./LoginAppUsingFirebaseAuthentication/UpdateEmailScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "././LoginAppUsingFirebaseAuthentication/Home"




import Main from "./LoginAppUsingFirebaseAuthentication/GoggleLoginApp/Main";

import UpdatePasswordScreen from "./LoginAppUsingFirebaseAuthentication/UpdatePasswordScreen";


export default function App() {

  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Home" component={Main} />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="UpdateEmailScreen" component={UpdateEmailScreen} />
        <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
