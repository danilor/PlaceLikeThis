import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import layout from '../config/layout.config.tsx';

import React, {useState} from 'react';

export default function Houses() {
  return (
    <View style={{...layout.styles.generalContainer}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {layout.images.houses.map((house, index) => {
            return (
              <Image key={index} source={house} style={styles.bottomImage} />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomImage: {
    width: '100%',
    height: undefined,
    aspectRatio: layout.aspectsRadio.houses,
    marginBottom: layout.generalMargin,
  },
});
