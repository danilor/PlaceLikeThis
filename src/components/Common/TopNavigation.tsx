import {Appbar, Menu, Searchbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {useState} from 'react';
import theme from '../../config/theme.config.tsx';
import {StyleSheet} from 'react-native';
import layout from '../../config/layout.config.tsx';
// @ts-ignore
export default function TopNavigation({navigation, route, options, back}) {
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
      elevated={true}
      theme={inTheme}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      {!searching && <Appbar.Content title={title} />}

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

const styles = StyleSheet.create({
  search: {
    flex: 1,
  },
});
