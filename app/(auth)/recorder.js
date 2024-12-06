import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { useRecordings } from "../../components/useRecordings";
import RecordingItem from "../../components/RecordingItem";
import RecordButton from "../../components/RecordButton";
import { Audio } from 'expo-av'; 

export default function AudioRecorderApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
    renameRecording,
  } = useRecordings();

  const filteredRecordings = recordings.filter((recording) =>
    recording.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playRecording = async (base64Audio) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: base64Audio });
      await sound.playAsync(); // Play the audio
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <RecordingItem
        recording={item}
        onDelete={() => deleteRecording(item.id)}
        onRename={(newName) => renameRecording(item.id, newName)}
        onPlay={() => playRecording(item.base64)} // Play the audio on button click
      />
    ),
    [deleteRecording, renameRecording]
  );

  return (
    <>
      <StatusBar style="dark" translucent={true} />

      <ImageBackground
        source={require("./assets/bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search recordings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <FlatList
            data={filteredRecordings}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />

          <RecordButton
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
});