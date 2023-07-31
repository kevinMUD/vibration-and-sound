import React from 'react';
import { View, StyleSheet } from 'react-native';
import VibrationSoundButton from './VibrationSoundButton'; // Correct the path here

const App = () => {
  return (
    <View style={styles.container}>
      <VibrationSoundButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
