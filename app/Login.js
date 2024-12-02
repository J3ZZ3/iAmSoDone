import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as NavigatorBar from "expo-navigation-bar";
import CustomInput from "../components/CustomInput";
import validateInput from "../utils/InputValid";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [errors, setErrors] = useState({});


  useEffect(() => {

    console.log(email);

    console.log(password);
    console.log(errors);
    console.log(info);

    
    
  }, [email, password, errors]);

  useEffect(() => {
    NavigatorBar.setBackgroundColorAsync("#010789");
    NavigatorBar.setBorderColorAsync("#BDBDBD");
  }, []);

  handleInput = (type, stateName, value) => {
    setErrors(errors => ({ 
      ...errors, 
      [stateName]: validateInput(type, value) }));
  }

  const handleOnSubmit = async() => {
    try {
      await AsyncStorage.setItem('reg', JSON.stringify({email, password}))
console.log('Data Submitted');

    } catch (error) {
      console.log({er: error});
      
    }
  };

  const handleOnGetData = async() => {
    const data = JSON.parse(await AsyncStorage.getItem('reg'))
    console.log({ data });
    setInfo([data.email, data.password]);
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        onLoadStart={() => console.log("Loading")}
        onLoadEnd={() => console.log("Loaded")}
        source={{
          uri: "https://i.pinimg.com/736x/59/54/61/59546197baae43e5cd4612bbe1d4424d.jpg",
        }}
      >
        <ScrollView contentContainerStyle={styles.ScrollView}>
          
          
          <CustomInput 
          name={"Email"} 
          onChange={setEmail}
          onBlur={() => handleInput('email', 'email', email)}
          error={errors?.email?.error}
           />
           
          <CustomInput 
          name={"Password"} 
          onChange={setPassword} 
          onBlur={() => handleInput('password', 'password', password)}
          error={errors?.password?.error || errors?.password?.errors}
          />
          <Pressable style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => handleOnSubmit()}
            >
              Press Here
            </Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleOnGetData()}>
            <Text>Get</Text>
            </Pressable>
            {
           
              <View style={{gap: 10, textTransform: "uppercase", backgroundColor: "grey"}}>
                <Text>Email:{info[0]}</Text>
                <Text>Password:{info[3]}</Text>
              </View>
            
          }
          <StatusBar backgroundColor="#010789" style="light" />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingHorizontal: 20,
  },
  ScrollView: {
    gap: 15,
    paddingVertical: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "black",
    color: "white",
    padding: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#306A68",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 16,
  },
});
