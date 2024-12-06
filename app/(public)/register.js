import {
  Button,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        onLoadStart={() => console.log("Loading")}
        onLoadEnd={() => console.log("Loaded")}
        source={{
          uri: "https://i.pinimg.com/736x/59/54/61/59546197baae43e5cd4612bbe1d4424d.jpg",
        }}
      >
        <View style={styles.container}>
          <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
          <Spinner visible={loading} />

          {!pendingVerification && (
            <>
              <TextInput
                autoCapitalize="none"
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.inputField}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.inputField}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Enter Email"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={styles.inputField}
              />
              <TextInput
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
              />

              <Button
                onPress={onSignUpPress}
                title="Sign up"
                color={"#FF3F3F"}
              ></Button>
            </>
          )}

          {pendingVerification && (
            <>
              <View>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  style={styles.inputField}
                  onChangeText={setCode}
                />
              </View>
              <Pressable onPress={onPressVerify} style={styles.button}>
                <Text style={styles.button}>Verify</Text>
              </Pressable>
            </>
          )}
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
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
    margin: 8,
    alignItems: "center",
    color: "#FF3F3F",
  },
});

export default Register;
