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
import {Card, Text} from 'react-native-paper';

export default function PlacesImages() {
  return (
    <View style={{...layout.styles.generalContainer}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant={'bodyLarge'}>
                A collection of AI Generated Images that we are using within
                this app. Could you find them all?
              </Text>
            </Card.Content>
          </Card>
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
  card: {
    marginBottom: layout.generalMargin * 2,
  },
});
