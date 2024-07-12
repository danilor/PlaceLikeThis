import {Alert, Image, StyleSheet, View} from 'react-native';
import { Drawer, useTheme } from "react-native-paper";
import layout from '../../config/layout.config.tsx';
import {useNavigation} from '@react-navigation/native';

type Props = {
  drawer: any;
};

export default function SidebarContent({drawer}: Props) {
  // const [active, setActive] = useState('');

  const theme = useTheme();
  const styles = StyleSheet.create({
    logoSpace: {
      height: 100,
      backgroundColor: layout.colors.eva02Red,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '30%',
      height: undefined,
      aspectRatio: 1,
    },

    bottomHeader: {
      height: undefined,
      width: '100%',
      aspectRatio: 500 / 87,
    },
  });

  const navigation = useNavigation();

  const navigateTo = (screen: string) => {
    drawer();
    // @ts-ignore
    navigation.navigate(screen);
  };
  return (
    <View>
      <View style={styles.logoSpace}>
        <Image source={layout.images.logo} style={styles.logo} />
      </View>

      <Image source={layout.images.bottomHeader} style={styles.bottomHeader} />

      <Drawer.Section title="Menu" showDivider={false}>
        <Drawer.Item
          label="Settings"
          icon={'tools'}
          active={false}
          onPress={() => {
            // navigateTo('About');
            // @ts-ignore
            navigateTo('Settings');
          }}
        />

        <Drawer.Item
          label="About"
          icon={'information'}
          active={false}
          onPress={() => {
            navigateTo('About');
          }}
        />

        <Drawer.Item
          label="AI Images"
          icon={'camera-image'}
          active={false}
          onPress={() => {
            navigateTo('Places');
          }}
        />
      </Drawer.Section>
    </View>
  );
}


