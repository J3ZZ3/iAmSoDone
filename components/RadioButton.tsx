import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, {createContext, useContext} from 'react'

type RadioButtonProps = {
    value: string,
    label: string
}

type RadioGroupProps = {
    children: React.ReactNode,
    groupName: string,
    selectedValue: string,
    setSelectedValue: (value: string) => void
}

type RadioContextType = {
    selectedValue: string,
    setSelectedValue: (value: string) => void
}

const RadioContext = createContext<RadioContextType>({
    selectedValue: '',
    setSelectedValue: () => {}
});



const RadioButton: React.FC<RadioButtonProps>  = ({value, label}) => {

    const {selectedValue, setSelectedValue} = useContext(RadioContext);

  return (
    <Pressable  
           style={{flexDirection: 'row',
            gap: 10}}
            onPress={() => setSelectedValue(value)}>
            <View 
            style={{
            borderWidth: 2, 
            borderColor: selectedValue === value ? '#BDBDBD' : '#000000', 
            borderRadius: 5,
            height: 20,
            width: 20,
            }}>
                {
                selectedValue === value && <View style={{width: 16, height: 16, backgroundColor: '#BDBDBD', borderRadius: 5}}/>
            }
                </View>
            <Text style={{color: selectedValue === value ? '#000000' : '#000000', fontSize: 16}}>{label}</Text>
            </Pressable>
  )
}

const RadioGroup: React.FC<RadioGroupProps> = ({children, groupName, selectedValue, setSelectedValue}) => {
    return (
        <RadioContext.Provider value={{selectedValue, setSelectedValue}}>
            <Text style={{color: "white",fontSize: 24,fontWeight: "700",marginTop: 20,textAlign: "center",alignItems: "center"}}>{groupName}</Text>
    <View style={{gap: 10}}>
    {children}
    </View>
        </RadioContext.Provider>
    )
}

export {RadioGroup, RadioButton}