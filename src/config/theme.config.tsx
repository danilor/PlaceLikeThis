import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DefaultDark,
} from 'react-native-paper';

// https://callstack.github.io/react-native-paper/docs/guides/theming/

const theme: ThemeProp = {
  dark: false,
  version: 3,
  mode: 'exact',
  colors: {},
};

const themes = {
  default: {
    light: DefaultTheme,
    dark: DefaultDark,
  },
};

export default DefaultTheme;
