import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Main from './Main.tsx';
import {Icon} from 'react-native-paper';
import FormScreen from './FormScreen.tsx';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon size={26} source={'home'} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
