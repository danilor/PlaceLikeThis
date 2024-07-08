import {Appbar, Button, Menu, Searchbar, Text} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import React, {useRef, useState} from 'react';
import theme from '../../config/theme.config.tsx';
import {Image, StyleSheet, View} from 'react-native';
import layout from '../../config/layout.config.tsx';
import { DrawerLayout } from "react-native-gesture-handler";

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
  drawer
}: Props) {
  const title = getHeaderTitle(options, route.name);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const inTheme = JSON.parse(JSON.stringify(theme));
  // @ts-ignore
  inTheme.colors.elevation.level2 = layout.colors.eva02Red;
  inTheme.colors.onSurface = layout.colors.justWhite;
  inTheme.colors.onSurfaceVariant = layout.colors.justWhite;

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
      {/*<Menu*/}
      {/*  visible={visible}*/}
      {/*  onDismiss={closeMenu}*/}
      {/*  anchor={*/}
      {/*    <Appbar.Action*/}

      {/*      icon="dots-vertical"*/}
      {/*      onPress={openMenu}*/}
      {/*    />*/}
      {/*  }>*/}
      {/*  <Menu.Item*/}
      {/*    onPress={() => {*/}
      {/*      console.log('Option 1 was pressed');*/}
      {/*    }}*/}
      {/*    title="Option 1"*/}
      {/*  />*/}
      {/*  <Menu.Item*/}
      {/*    onPress={() => {*/}
      {/*      console.log('Option 2 was pressed');*/}
      {/*    }}*/}
      {/*    title="Option 2"*/}
      {/*  />*/}
      {/*  <Menu.Item*/}
      {/*    onPress={() => {*/}
      {/*      console.log('Option 3 was pressed');*/}
      {/*    }}*/}
      {/*    title="Option 3"*/}
      {/*    disabled*/}
      {/*  />*/}
      {/*</Menu>*/}
    </Appbar.Header>
  );
}

export default function TopNavigation({
  navigation,
  route,
  options,
  back,
  drawer
}: Props) {
  const title = getHeaderTitle(options, route.name);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searching, setSearching] = React.useState(false);

  const inTheme = JSON.parse(JSON.stringify(theme));
  // @ts-ignore
  inTheme.colors.elevation.level2 = layout.colors.eva02Red;
  inTheme.colors.onSurface = layout.colors.justWhite;
  inTheme.colors.onSurfaceVariant = layout.colors.justWhite;

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

        {/*<Appbar.Action
            icon={'information'}
            onPress={() => {
              console.log('Setting open');
              navigation.navigate('About');
            }}
          /> */}

        <Appbar.Action
          icon={'dots-vertical'}
          onPress={() => {
            console.log('Setting open');
            drawer();
            // navigation.openDrawer();
          }}
        />

      </Appbar.Header>
      {searching && (
        <View style={styles.searchArea}>
          <Searchbar
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
