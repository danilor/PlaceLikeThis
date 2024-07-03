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
import { useSelector } from "react-redux";

// @ts-ignore
export default function RecentLocations({navigation}) {
  const [locations, setLocations] = useState<PlaceInformation[]>([]);
  const [loaded, setLoaded] = useState(false);

  const count: number = useSelector((state: any) => state.counter.value);

  useEffect(() => {
    getPlaces().then(places => {
      setLocations(places);
      setLoaded(true);
    });
  }, [count]);

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
