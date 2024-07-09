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

type Props = {
  navigation: any;
  searchTerm?: string;
};

export default function RecentLocations({navigation, searchTerm}: Props) {
  const [locations, setLocations] = useState<PlaceInformation[]>([]);
  const [loaded, setLoaded] = useState(false);

  const count: number = useSelector((state: any) => state.counter.value);

  // console.log('Search:', searchTerm);

  useEffect(() => {
    getPlaces(searchTerm).then(places => {
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
          return <SingleLocation key={index} navigation={navigation} location={location} />;
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
