import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Vibration, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const soundFileUrl = 'https://drive.google.com/uc?export=download&id=1VD5xqZQEjj_2ivP74aVC9TozZD3Nyq9K'; // Replace with the actual direct sound file URL

const VibrationSoundButton = () => {
  const [soundObject, setSoundObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const playSound = async () => {
    try {
      // Show loading state
      setIsLoading(true);

      // Load the sound file using Expo's Audio API
      const { sound } = await Audio.Sound.createAsync({ uri: soundFileUrl });

      // Play the sound
      await sound.playAsync();

      // Store the sound object in state
      setSoundObject(sound);

      // Trigger vibration when the sound starts playing
      Vibration.vibrate();
    } catch (error) {
      console.log('Error loading sound:', error);
    } finally {
      // Hide loading state
      setIsLoading(false);
    }
  };

  const stopSound = async () => {
    if (soundObject) {
      try {
        // Stop the sound
        await soundObject.stopAsync();

        // Release the sound object
        await soundObject.unloadAsync();

        // Reset the sound object in state
        setSoundObject(null);

        // Trigger vibration when the sound stops
        Vibration.vibrate();
      } catch (error) {
        console.log('Error stopping sound:', error);
      }
    }
  };

  const isSoundPlaying = soundObject !== null;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('./assets/headph.jpeg')} style={styles.backgroundImage} />

      {/* Gradient overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)']}
        style={[StyleSheet.absoluteFillObject, styles.overlay]}
      />

      {/* Title */}
      <Text style={styles.title}>My Sound App</Text>

      {/* Start Button */}
      <TouchableOpacity
        onPress={playSound}
        style={[styles.button, { backgroundColor: isLoading ? 'grey' : 'rgba(33, 150, 243, 0.8)' }]}
        disabled={isLoading || isSoundPlaying}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
        ) : (
          <Feather name="play-circle" size={24} color="white" />
        )}
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      {/* Stop Button */}
      <TouchableOpacity
        onPress={stopSound}
        style={[styles.button, { backgroundColor: isSoundPlaying ? 'rgba(255, 0, 0, 0.8)' : 'grey' }]}
        disabled={!isSoundPlaying}
      >
        <Feather name="stop-circle" size={24} color="white" />
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default VibrationSoundButton;
