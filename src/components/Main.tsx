import {StyleSheet, View} from 'react-native';

import Scrollable from './Common/Scrollable.tsx';
import layout from '../config/layout.config.tsx';
import {FAB, Searchbar} from 'react-native-paper';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import Mapped from "./Common/Mapped.tsx";
import RecentLocations from "./Listing/RecentLocations.tsx";

// @ts-ignore
export default function Main({navigation}) {
  // const isDarkMode = useColorScheme() === 'dark';

  /* return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          elevation={2}
        />
      </View>
      <View style={styles.content}>

      </View>
    </View>
  );*/

  const navigateToForm = () => {
    navigation.navigate('Form');
  };

  // @ts-ignore
  return (<View style={{...layout.styles.generalContainer}}>


    <RecentLocations></RecentLocations>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={navigateToForm}
        // label={'Add'}
        accessibilityLabel={'Add New Place'}
        animated={true}
        size={'medium'}
        loading={false}
        mode={'elevated'}
        variant={'tertiary'}
        color={layout.colors.justWhite}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: layout.colors.eva02Red,
    color: 'white',
  },
});
