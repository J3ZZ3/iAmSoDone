import { Component, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";

export default function Counter() {
    
    const [counter, setCounter] = useState(0)


    useEffect(() => {
        console.log();
        return() => {
            console.log('hi');
            
        }
    },[])

    useEffect(() => {
        console.log('placememt:', counter);
        
    },[counter])

    const handleIncrement = () => {
        setCounter(state => state += 1)
    }

    const handleDecrement = () => {
        setCounter(state => state -= 1)
    }

    const {user} = useUser();

        return(
<SafeAreaView style={styles.container}>
    <View>
    <Text>Welcome Home, {user?.emailAddresses[0].emailAddress}</Text>

    </View>
    <View  style={styles.counterCont}>
    <Pressable style={styles.button}>
              <Text style={styles.buttonText} onPress={handleDecrement}>
                Minus
              </Text>
            </Pressable>
            <Text style={styles.counterText}>{counter}</Text>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText} onPress={handleIncrement}>
                Add
              </Text>
            </Pressable>
    </View>
    
</SafeAreaView>
        )
    }


const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
      },
    button: {
        backgroundColor: "#306A68",
        padding: 15,
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
      counterCont: {
        flexDirection: 'row',
        gap: 20
      },
      counterText:{
        color: '#BDBDBD',
      }
})
