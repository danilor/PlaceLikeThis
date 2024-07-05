const margin = 10;
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let layout = {
  generalMargin: margin,
  mapSpaceSize: 195,
  images: {
    logo: require('../assets/img/logo.png'),
    pattern: require('../assets/img/pattern.png'),
    arkhive: require('../assets/img/arkhive.png'),
    houses: [
      require('../assets/img/houses/c01.png'),
      require('../assets/img/houses/c02.png'),
      require('../assets/img/houses/c03.png'),
      require('../assets/img/houses/c04.png'),
      require('../assets/img/houses/c05.png'),
      require('../assets/img/houses/c06.png'),
    ],
    icons: {
      twitter: require('../assets/img/icons/twitter.png'),
      instagram: require('../assets/img/icons/instagram.png'),
      github: require('../assets/img/icons/github.png'),
      box: require('../assets/img/icons/box.png'),
      facebook: require('../assets/img/icons/facebook.png'),
    },
  },
  colors: {
    eva02Red: '#ed2323',
    justWhite: '#FFFFFF',
  },

  socialIcons: [
    {
      name: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com/arkofdan',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://www.instagram.com/daniloramirezcr_thearkhive/',
    },
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/danilor',
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/thearkhive',
    },
  ],

  styles: {
    generalContainer: {
      flex: 1,
      margin: margin,
      // height: windowHeight,
      backgroundColor: 'transparent',
      // paddingBottom: margin*10,
    },
  },
  drawer:{
    drawerWidth: 300,
    drawerPosition: 'right',
  },
};
export default layout;
