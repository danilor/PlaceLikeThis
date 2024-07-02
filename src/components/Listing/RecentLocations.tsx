import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlaceInformation from '../../Models/PlaceInformation.model.tsx';
import {getPlaces} from '../../lib/database.lib.tsx';
import NoLocations from './NoLocations.tsx';
import SingleLocation from './SingleLocation.tsx';

export default function RecentLocations() {
  const [locations, setLocations] = useState<PlaceInformation[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPlaces().then(places => {
      setLocations(places);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <View />;
  }
  if (locations.length === 0) {
    return <NoLocations />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {locations.map((location, index) => {
          return <SingleLocation key={index} location={location} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
