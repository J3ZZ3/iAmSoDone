import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export function useRecordings() {
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null); // For web
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    loadRecordings();
    if (Platform.OS !== 'web') {
      setupAudio();
    }
  }, []);

  async function setupAudio() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  }

  async function loadRecordings() {
    try {
      const storedRecordings = await AsyncStorage.getItem('@audio_recordings');
      if (storedRecordings) {
        setRecordings(JSON.parse(storedRecordings));
      }
    } catch (error) {
      console.error('Error loading recordings:', error);
    }
  }

  async function saveRecordings(newRecordings) {
    try {
      await AsyncStorage.setItem('@audio_recordings', JSON.stringify(newRecordings));
      setRecordings(newRecordings);
    } catch (error) {
      console.error('Error saving recordings:', error);
    }
  }

  async function startRecording() {
    if (Platform.OS === 'web') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setAudioChunks([]);
        recorder.ondataavailable = (e) => {
          setAudioChunks((prev) => [...prev, e.data]);
        };
        recorder.start();
      } catch (error) {
        console.error('Error starting web recording:', error);
      }
    } else {
      try {
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await recording.startAsync();
        setRecording(recording);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  }

  async function stopRecording() {
    if (Platform.OS === 'web') {
      try {
        if (mediaRecorder) {
          mediaRecorder.stop();
          mediaRecorder.onstop = async () => {
            const blob = new Blob(audioChunks, { type: 'audio/mpeg' });
            const uri = URL.createObjectURL(blob);

            const newRecording = {
              id: Date.now().toString(),
              name: `Recording ${recordings.length + 1}`,
              date: new Date().toISOString(),
              duration: 0, // Cannot determine duration easily on web
              uri,
            };

            const newRecordings = [...recordings, newRecording];
            await saveRecordings(newRecordings);
          };
        }
      } catch (error) {
        console.error('Error stopping web recording:', error);
      }
    } else {
      try {
        if (!recording) return;

        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        const { sound, status } = await recording.createNewLoadedSoundAsync();

        const newRecording = {
          id: Date.now().toString(),
          name: `Recording ${recordings.length + 1}`,
          date: new Date().toISOString(),
          duration: status.durationMillis || 0,
          uri,
        };

        const newRecordings = [...recordings, newRecording];
        await saveRecordings(newRecordings);
        setRecording(null);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  }

  async function deleteRecording(id) {
    try {
      const newRecordings = recordings.filter((r) => r.id !== id);
      await saveRecordings(newRecordings);
    } catch (error) {
      console.error('Error deleting recording:', error);
    }
  }

  return {
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
  };
}