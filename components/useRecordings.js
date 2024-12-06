import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'; 
import { supabase } from '../config/supabaseClient';

const RECORDINGS_KEY = '@audio_recordings';

export function useRecordings() {
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    loadRecordings();
    setupAudio();
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
      const storedRecordings = await AsyncStorage.getItem(RECORDINGS_KEY);
      if (storedRecordings) {
        const recordingsData = JSON.parse(storedRecordings);
        for (const recording of recordingsData) {
          if (recording.base64) {
            const path = FileSystem.documentDirectory + recording.id + '.m4a';
            await FileSystem.writeAsStringAsync(path, recording.base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            recording.uri = path;
          }
        }
        setRecordings(recordingsData);
      }
    } catch (error) {
      console.error('Error loading recordings:', error);
    }
  }

  async function saveRecordings(newRecordings) {
    try {
      await AsyncStorage.setItem(RECORDINGS_KEY, JSON.stringify(newRecordings));
      setRecordings(newRecordings);
    } catch (error) {
      console.error('Error saving recordings:', error);
    }
  }

  async function startRecording() {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  async function stopRecording() {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) return;

      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { sound, status } = await recording.createNewLoadedSoundAsync();

      const newRecording = {
        id: Date.now().toString(),
        name: `Recording ${recordings.length + 1}`,
        date: new Date().toISOString(),
        duration: status.durationMillis || 0,
        base64: base64Audio,
        uri,
      };

      const newRecordings = [...recordings, newRecording];
      await saveRecordings(newRecordings);
      setRecording(null);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }

  async function deleteRecording(id) {
    try {
      const recording = recordings.find(r => r.id === id);
      if (recording) {
        await FileSystem.deleteAsync(recording.uri);
        const newRecordings = recordings.filter(r => r.id !== id);
        await saveRecordings(newRecordings);
      }
    } catch (error) {
      console.error('Error deleting recording:', error);
    }
  }

  function renameRecording(id, newName) {
    const newRecordings = recordings.map(recording =>
      recording.id === id ? { ...recording, name: newName } : recording
    );
    saveRecordings(newRecordings);
  }

  async function uploadRecording(recording) {
    try {
      const fileUri = recording.uri;
      const fileExtension = fileUri.split('.').pop();
      const fileName = `${recording.id}.${fileExtension}`;
      
      const file = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { data, error } = await supabase
        .storage
        .from('recordings')
        .upload(fileName, file, {
          contentType: `audio/${fileExtension}`,
          upsert: true,
        });

      if (error) {
        throw error;
      }

      console.log('File uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading recording:', error);
      throw error;
    }
  }

  return {
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
    renameRecording,
    uploadRecording,
  };
}