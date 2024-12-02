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
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, Component } from "react";
import * as NavigatorBar from "expo-navigation-bar";
import CustomInput from "../components/CustomInput";
import {Link} from "expo-router";
export default class Login extends Component {
  constructor() {
    // allow you to set initial state to the app before methods are called

    super(); //allows you access to props from main class

    this.handlePress = this.handlePress.bind(this);

    this.state = {
      email: "",
      Password: "",
      errors: {}
    };
  }

  //componentDidUpdate: component is added to the view
  //componentDidUpdate: component state/props are updated
  //componentWillUnmount: component will be removed from view


componentDidUpdate() {
  console.log({state:this.state});
  
};

componentDidMount(){
  console.log('mounted');
//set the state of the component
//fetch data from api and database
//add event listeners or subscriptions
  
};

componentWillUnmount() {
  console.log('unmounted');
  //for removing event listeners or subscriptions relative to api
  
};

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // useEffect(() => {
  //   console.log(firstName);
  //   console.log(lastName)
  //   console.log(email)
  //   console.log(password)
  //   console.log(confirmPassword)
  // }, [firstName, lastName, email, password, confirmPassword]);

  // useEffect(() => {
  //   NavigatorBar.setBackgroundColorAsync("#010789");
  //   NavigatorBar.setBorderColorAsync("#BDBDBD");
  // }, []);

  handlePress = () => {
    Alert.alert("Alert", "Button Pressed", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Delete Pressed"),
      },
    ]);
  };

  handleLongPress = () => {
    ToastAndroid.show("User Long Pressed Button", 5000);
  };

  handleShowAlert = () => {
    ToastAndroid.show("User Pressed Button", 5000);
  };

 handleInput = (type, stateName, value) => {
  this.setState(state => ({
    ...state,
    errors: {
      ...state.errors,
      [stateName]: this.validateInput(type, value)
    }
  }))
 };

 validateInput = (type, value) => {
  if(value.trim() === "") return {
  valid: false,
  error: 'Input required'
    }
    if (type === 'email') {
      return /\S+\@\S+\.\S+/.test(value) ? {
        valid: true, error: null
      }: {
        valid:false, error: 'Email required'}
    }

      if(type ==='string') {
        return /([A-Za-z])+/.test(value) ? {
          valid:true, error:null
        } : {
          valid: false, error: 'Only Use Alphabets For Password)'
        }
      }
    
 };

 render() {
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
            <Text style={styles.title}>Login</Text>
            <CustomInput 
            name="Email" 
            onChange={(text) => this.setState({email: text})}
            onBlur={ () => this.handleInput('email', 'email', this.state.email)}
            error={this.state.errors?.email?.error}

            />
            <CustomInput 
            name="Password" 
            onChange={(text) => this.setState({password: text})}
            onBlur={ () => this.handleInput('string', 'password', this.state.password)}
            error={this.state.errors?.password?.error}
            />
            <Pressable style={styles.button}>
              <Text style={styles.buttonText} onPress={this.handlePress}>
                Login
              </Text>
            </Pressable>
            <View>
              <Text style={styles.SignUp}>Don't have an account?</Text>
              <Pressable>
                <Link
                  style={styles.signUpButton}
                  href={{pathname:"/Registration", params: {from: "Login", redirectTo: "Home"}}}
                >
                  Signup
                </Link>
              </Pressable>
            </View>
            <Text style={{color: 'BDBDBD'}}>{this.state.email}</Text>
            <Text style={{color: 'BDBDBD'}}>{this.state.password}</Text>

       </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  };
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
  SignUp: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  signUpButton: {
    color: "#306A68",
    textAlign: "center",
    marginTop: 20,
    borderColor: "#306A68",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});