import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        alert('Permission to access microphone is required!');
      }
    };
    getPermissions();
  }, []);

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setIsRecording(false);
      setRecording(null);

      const newRecording = { uri, date: new Date().toLocaleString() };
      setRecordings([...recordings, newRecording]);
    }
  };

  const playAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    setSound(sound);
  };

  const deleteRecording = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setRecordings(recordings.filter((recording) => recording.uri !== uri));
  };

  return (
    <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        onLoadStart={() => console.log("Loading")}
        onLoadEnd={() => console.log("Loaded")}
        source={{
          uri: "https://i.pinimg.com/736x/59/54/61/59546197baae43e5cd4612bbe1d4424d.jpg",
        }}>
    <SafeAreaView>
      
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Voice Recorder</Text>

      {}
      {!isRecording ? (
        <Button title="Start Recording" onPress={startRecording} />
      ) : (
        <Button title="Stop Recording" onPress={stopRecording} />
      )}

      <FlatList
        data={recordings}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{item.date}</Text>
            <Button title="Play" onPress={() => playAudio(item.uri)} />
            <Button title="Delete" onPress={() => deleteRecording(item.uri)} />
          </View>
        )}
      />
    </View>
    </SafeAreaView>    
    </ImageBackground>

  );
}