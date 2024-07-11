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
    defaultPlace: require('../assets/img/defaultplace.png'),
    bottomHeader: require('../assets/img/bottomheader.png'),
    houses: [
      require('../assets/img/houses/c01.png'),
      require('../assets/img/houses/c02.png'),
      require('../assets/img/houses/c03.png'),
      require('../assets/img/houses/c04.png'),
      require('../assets/img/houses/c05.png'),
      require('../assets/img/houses/c06.png'),
      require('../assets/img/houses/c07.png'),
      require('../assets/img/houses/c08.png'),
      require('../assets/img/houses/c09.png'),
      require('../assets/img/houses/c10.png'),
      require('../assets/img/houses/c11.png'),
      require('../assets/img/houses/c12.png'),
      require('../assets/img/houses/c13.png'),
      require('../assets/img/houses/c14.png'),
      require('../assets/img/houses/c15.png'),
      require('../assets/img/houses/c16.png'),
      require('../assets/img/houses/c17.png'),
      require('../assets/img/houses/c18.png'),
      require('../assets/img/houses/c19.png'),
      require('../assets/img/houses/c20.png'),
    ],
    icons: {
      twitter: require('../assets/img/icons/twitter.png'),
      instagram: require('../assets/img/icons/instagram.png'),
      github: require('../assets/img/icons/github.png'),
      box: require('../assets/img/icons/box.png'),
      facebook: require('../assets/img/icons/facebook.png'),
    },
    settingIcons:{
      about: require('../assets/img/icons/settings/about.png'),
      airplane: require('../assets/img/icons/settings/airplane.png'),
      apps: require('../assets/img/icons/settings/apps.png'),
      battery: require('../assets/img/icons/settings/battery.png'),
      bluetooth: require('../assets/img/icons/settings/bluetooth.png'),
      cellular: require('../assets/img/icons/settings/cellular.png'),
      control: require('../assets/img/icons/settings/control.png'),
      data: require('../assets/img/icons/settings/data.png'),
      display: require('../assets/img/icons/settings/display.png'),
      display2: require('../assets/img/icons/settings/display2.png'),
      dnd: require('../assets/img/icons/settings/dnd.png'),
      general: require('../assets/img/icons/settings/general.png'),
      hotspot: require('../assets/img/icons/settings/hotspot.png'),
      memory: require('../assets/img/icons/settings/memory.png'),
      more: require('../assets/img/icons/settings/more.png'),
      notifications: require('../assets/img/icons/settings/notifications.png'),
      sound: require('../assets/img/icons/settings/sound.png'),
      storage: require('../assets/img/icons/settings/storage.png'),
      user: require('../assets/img/icons/settings/user.png'),
      wifi: require('../assets/img/icons/settings/wifi.png'),
    }
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
      padding: margin,
      // height: windowHeight,
      // backgroundColor: 'transparent',
      backgroundColor: '#dddddd',
      // paddingBottom: margin*10,
    },
    sideStretchContainer: {
      flex: 1,
      // padding: margin,
      paddingTop: margin,
      paddingBottom: margin,
      // height: windowHeight,
      // backgroundColor: 'transparent',
      backgroundColor: '#dddddd',
      // paddingBottom: margin*10,
    },
  },
  drawer: {
    drawerWidth: 300,
    drawerPosition: 'right',
  },
  aspectsRadio: {
    houses: 806 / 461,
    logo: 437 / 307,
  },
};
export default layout;
