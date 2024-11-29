import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState();
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // Request permissions for microphone access
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        alert('Permission to access microphone is required!');
      }
    };
    getPermissions();
  }, []);

  // Start recording
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

  // Stop recording
  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setIsRecording(false);
      setRecording(null);

      // Save the recorded file path to the recordings list
      const newRecording = { uri, date: new Date().toLocaleString() };
      setRecordings([...recordings, newRecording]);
    }
  };

  // Play the recorded audio
  const playAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    setSound(sound);
  };

  // Delete a recording
  const deleteRecording = async (uri) => {
    await FileSystem.deleteAsync(uri);
    setRecordings(recordings.filter((recording) => recording.uri !== uri));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Voice Recorder</Text>

      {/* Start/Stop recording buttons */}
      {!isRecording ? (
        <Button title="Start Recording" onPress={startRecording} />
      ) : (
        <Button title="Stop Recording" onPress={stopRecording} />
      )}

      {/* List of recordings */}
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{item.date}</Text>
            <Button title="Play" onPress={() => playAudio(item.uri)} />
            <Button title="Delete" onPress={() => deleteRecording(item.uri)} />
          </View>
        )}
      />
    </View>
  );
}