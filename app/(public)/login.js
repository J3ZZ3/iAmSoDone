import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          onLoadStart={() => console.log("Loading")}
          onLoadEnd={() => console.log("Loaded")}
          source={{
            uri: "https://i.pinimg.com/736x/59/54/61/59546197baae43e5cd4612bbe1d4424d.jpg",
          }}
        >
      <Spinner visible={loading} />

      <TextInput autoCapitalize="none" placeholder="Enter Email" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

      
      <Pressable onPress={onSignInPress} style={{backgroundColor: "#FF3131",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center"
    
    }}>
          <Text style={{color: "white", fontWeight: "800"}}>Login</Text>
        </Pressable>

      
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
    </ImageBackground>
  );
};

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
  inputField: {
    backgroundColor: "black",
    color: "white",
    padding: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 100,
  },
  button: {
    backgroundColor: "#FF3131",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
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

export default Login;