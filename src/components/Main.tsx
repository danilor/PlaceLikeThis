import {StyleSheet, View} from 'react-native';

import layout from '../config/layout.config.tsx';
import {FAB} from 'react-native-paper';
import React from 'react';
import RecentLocations from './Listing/RecentLocations.tsx';

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
  return (
    <View style={{...layout.styles.generalContainer}}>
      <View style={{flex: 12}}>
        <RecentLocations navigation={navigation} />
      </View>
      {/*<View style={{flex: 1}}></View>*/}
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
    margin: layout.generalMargin * 2,
    // marginRight: layout.generalMargin * 2,
    // marginBottom: layout.generalMargin * 10,
    right: 0,
    bottom: 0,
    backgroundColor: layout.colors.eva02Red,
    color: 'white',
  },
});
