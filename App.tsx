import 'react-native-gesture-handler';
import Main from './src/components/Main.tsx';
import {PaperProvider, Text} from 'react-native-paper';
import theme from './src/config/theme.config.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopNavigation from './src/components/Common/TopNavigation.tsx';
import {useCallback, useEffect, useRef, useState} from 'react';
import FormScreen from './src/components/FormScreen.tsx';
import {getSettings, initializeDB} from './src/lib/database.lib.tsx';
import store from './src/store/store';
import {Provider, useDispatch} from 'react-redux';
import About from './src/components/About.tsx';
import PlaceDetails from './src/components/PlaceDetails.tsx';
import {Drawer} from 'react-native-drawer-layout';
import SidebarContent from './src/components/Common/SidebarContent.tsx';
import PlacesImages from './src/components/PlacesImages.tsx';
import screenStackConfig from './src/config/screenStack.config.tsx';
import layout from './src/config/layout.config.tsx';
import SearchResults from './src/components/SearchResults.tsx';
import SettingsScreen from './src/components/SettingsScreen.tsx';
import {setSettings} from './src/store/reducers/settingsSlice';

/**
 * Main Application Component
 * @constructor
 */
function App() {
  const Stack = createNativeStackNavigator();
  // const Drawer = createDrawerNavigator();
  const [loaded, setLoaded] = useState(false);

  /**
   * Controls the drawer state
   */
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = store.dispatch;

  /**
   * Here we should have the process of DB creation in case it is not created yet.
   * This should also read the settings and send them to the store.
   */
  const loadDataCallback = useCallback(async () => {
    try {
      console.log('Loading local db');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const db = await initializeDB();
      const settings = await getSettings();
      console.log('Settings', settings);
      dispatch(setSettings(settings));
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  /********************************************************************************************/
  if (!loaded) {
    return null;
  }

  const changeDrawerState = () => {
    // setDrawerOpen(!drawerOpen);
    // console.log('Change drawer');
    setDrawerOpen(prevOpen => !prevOpen);
    // @ts-ignore
    // drawerLayourReference.current.openDrawer();
  };

  // <DrawerNavigator />;

  // @ts-ignore
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Drawer
            drawerType={'slide'}
            open={drawerOpen}
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)}
            // @ts-ignore
            drawerPosition={layout.drawer.drawerPosition}
            // @ts-ignore
            renderDrawerContent={(props: any) => {
              return <SidebarContent {...props} drawer={changeDrawerState} />;
            }}>
            <Stack.Navigator
              initialRouteName={'Home'}
              screenOptions={{
                header: props => (
                  // @ts-ignore
                  <TopNavigation {...props} drawer={changeDrawerState} />
                ),
              }}>
              <Stack.Screen
                name="Home"
                component={Main}
                // @ts-ignore
                options={{title: 'Place Like This', ...screenStackConfig}}
              />

              <Stack.Screen
                name="SearchResults"
                // @ts-ignore
                component={SearchResults}
                // @ts-ignore
                options={{title: 'Search Results', ...screenStackConfig}}
              />

              <Stack.Screen
                name="Form"
                // @ts-ignore
                component={FormScreen}
                // @ts-ignore
                options={{
                  title: 'Place Information',
                  ...screenStackConfig,
                }}
              />
              <Stack.Screen
                name="PlaceDetails"
                // @ts-ignore
                component={PlaceDetails}
                // @ts-ignore
                options={{
                  title: 'Place Information',
                  ...screenStackConfig,
                }}
              />
              <Stack.Screen
                name="About"
                // @ts-ignore
                component={About}
                // @ts-ignore
                options={{
                  title: 'About',
                  ...screenStackConfig,
                }}
              />
              <Stack.Screen
                name="Places"
                // @ts-ignore
                component={PlacesImages}
                // @ts-ignore
                options={{
                  title: 'Places Images',
                  ...screenStackConfig,
                }}
              />
              <Stack.Screen
                name="Settings"
                // @ts-ignore
                component={SettingsScreen}
                // @ts-ignore
                options={{
                  title: 'Settings',
                  ...screenStackConfig,
                }}
              />
            </Stack.Navigator>
          </Drawer>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

export default App;
