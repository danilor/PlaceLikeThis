import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Main from '../Main.tsx';
import About from '../About.tsx';

type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
};
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Main} />
        <Drawer.Screen name="Settings" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default DrawerNavigator;
