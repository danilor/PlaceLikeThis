import Main from './src/components/Main.tsx';
import {PaperProvider} from 'react-native-paper';
import theme from './src/config/theme.config.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopNavigation from './src/components/Common/TopNavigation.tsx';
import {useCallback, useEffect, useState} from 'react';
import FormScreen from './src/components/FormScreen.tsx';
import {initializeDB} from './src/lib/database.lib.tsx';
import store from './src/store/store';
import {Provider} from 'react-redux';

function App() {
  const Stack = createNativeStackNavigator();

  const [loaded, setLoaded] = useState(false);

  /**
   * Here we should have the process of DB creation in case it is not created yet
   */

  const loadDataCallback = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const db = await initializeDB();
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

  // @ts-ignore
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Home'}
            // @ts-ignore
            screenOptions={{header: props => <TopNavigation {...props} />}}>
            <Stack.Screen
              name="Home"
              component={Main}
              options={{title: 'Place Like This', headerShown: true}}
            />

            <Stack.Screen
              name="Form"
              // @ts-ignore
              component={FormScreen}
              options={{
                title: 'Add new Place',
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

export default App;
