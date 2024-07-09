import {View} from 'react-native';
import layout from '../config/layout.config.tsx';
import RecentLocations from './Listing/RecentLocations.tsx';
import React, {useEffect} from 'react';

type Props = {
  navigation: any;
  route: any;
  options: any;
  back: any;
};

export default function SearchResults({
  navigation,
  route,
  options,
  back,
}: Props) {
  let searchQuery = '';

  let title = 'Search Results';
  try {
    searchQuery = route.params.searchQuery;
    title += ': ' + searchQuery;
    // console.log('Search Query:', route.params.searchQuery);
  } catch (e) {}

  useEffect(() => {
    navigation.setParams({title: title, headerTitle: title});
    navigation.setOptions({title: title, headerTitle: title});
  }, []);

  return (
    <View style={{...layout.styles.generalContainer}}>
      <View style={{flex: 12}}>
        <RecentLocations navigation={navigation} searchTerm={searchQuery} />
      </View>
      {/*<View style={{flex: 1}}></View>*/}
    </View>
  );
}
