import {Text} from 'react-native-paper';
import layout from '../../config/layout.config.tsx';
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

export default function NoLocations() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={layout.images.logo} />
      <Text>No places added</Text>
      <Text>Start adding them pushing the plus [+] button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 100,
    width: '20%',
    height: undefined,
    aspectRatio: 1,
  },
});
