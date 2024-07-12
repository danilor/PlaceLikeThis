import {Appbar, Searchbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import React, {useState} from 'react';
import theme from '../../config/theme.config.tsx';
import {Image, StyleSheet, View} from 'react-native';
import layout from '../../config/layout.config.tsx';

type Props = {
  navigation: any;
  route: any;
  options: any;
  back: any;
  drawer: any;
};

export function TopNavigation_backup({
  navigation,
  route,
  options,
  back,
  drawer,
}: Props) {
  const title = getHeaderTitle(options, route.name);

  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const inTheme = JSON.parse(JSON.stringify(theme));
  // @ts-ignore
  // inTheme.colors.elevation.level2 = layout.colors.eva02Red;
  // inTheme.colors.onSurface = layout.colors.justWhite;
  // inTheme.colors.onSurfaceVariant = layout.colors.justWhite;

  inTheme.colors.elevation.level2 = inTheme.colors.primary;
  inTheme.colors.onSurface = inTheme.colors.onPrimary;
  inTheme.colors.onSurfaceVariant = inTheme.colors.onPrimary;

  return (
    <Appbar.Header
      mode={!back ? 'center-aligned' : 'small'}
      // mode={'small'}
      elevated={true}
      theme={inTheme}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      {!searching && !back && (
        <Image source={layout.images.logo} style={styles.logo} />
      )}
      {!searching && back && <Appbar.Content title={title} />}
      {!searching && !back && <Appbar.Content title={''} />}

      {searching && (
        <Searchbar
          placeholder="Search"
          onChangeText={value => {
            setSearchQuery(value);
          }}
          value={searchQuery}
          elevation={1}
          style={styles.search}
        />
      )}

      {!back && !searching && (
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setSearching(!searching);
          }}
        />
      )}

      {!back && searching && (
        <Appbar.Action
          icon="close-circle"
          onPress={() => {
            setSearching(!searching);
          }}
        />
      )}

      {!back && !searching && (
        <Appbar.Action
          icon="information"
          onPress={() => {
            // navigation.navigate('About');
            drawer();
          }}
        />
      )}
    </Appbar.Header>
  );
}

export default function TopNavigation({
  navigation,
  route,
  options,
  back,
  drawer,
}: Props) {
  const title = getHeaderTitle(options, route.name);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searching, setSearching] = React.useState(false);

  const inTheme = JSON.parse(JSON.stringify(theme));
  // @ts-ignore
  inTheme.colors.elevation.level2 = layout.colors.eva02Red;
  inTheme.colors.onSurface = layout.colors.justWhite;
  inTheme.colors.onSurfaceVariant = layout.colors.justWhite;

  const onSearch = () => {
    // console.log('Searching for:', searchQuery);
    navigation.navigate('SearchResults', {searchQuery: searchQuery});
  };

  return (
    <View>
      <Appbar.Header
        mode={!back ? 'center-aligned' : 'small'}
        // mode={'small'}
        elevated={true}
        theme={inTheme}>
        {back && <Appbar.BackAction onPress={navigation.goBack} />}

        {!back && <Image source={layout.images.logo} style={styles.logo} />}

        {back && <Appbar.Content title={title} />}
        {!back && <Appbar.Content title={''} />}

        {!back && (
          <Appbar.Action
            icon={!searching ? 'magnify' : 'magnify-remove-outline'}
            onPress={() => {
              console.log('Search');
              setSearching(!searching);
            }}
          />
        )}

        <Appbar.Action
          icon={'dots-vertical'}
          onPress={() => {
            // console.log('Setting open');
            drawer();
            // navigation.openDrawer();
          }}
        />
      </Appbar.Header>
      {searching && (
        <View style={styles.searchArea}>
          <Searchbar
            returnKeyType={'search'}
            onSubmitEditing={onSearch}
            mode={'bar'}
            searchAccessibilityLabel={'Search'}
            clearAccessibilityLabel={'Clear'}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
  },
  logo: {
    width: '10%',
    height: undefined,
    aspectRatio: 1,
  },
  searchArea: {
    backgroundColor: layout.colors.eva02Red,
    height: 75,
    padding: layout.generalMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
