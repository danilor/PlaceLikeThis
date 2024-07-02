const margin = 10;
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let layout = {
  generalMargin: margin,
  images: {
    pattern: require('../assets/img/pattern.png'),
    houses: [
      require('../assets/img/houses/c01.png'),
      require('../assets/img/houses/c02.png'),
      require('../assets/img/houses/c03.png'),
      require('../assets/img/houses/c04.png'),
      require('../assets/img/houses/c05.png'),
      require('../assets/img/houses/c06.png'),
    ],
  },
  colors: {
    eva02Red: '#ed2323',
    justWhite: '#FFFFFF',
  },

  styles: {
    generalContainer: {
      flex: 1,
      margin: margin,
      height: windowHeight,
      backgroundColor: 'transparent',
      // paddingBottom: margin*10,
    },
  },
};
export default layout;
