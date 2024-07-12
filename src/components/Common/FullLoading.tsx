import { Image, StyleSheet, View } from "react-native";
import {ActivityIndicator, useTheme} from 'react-native-paper';
import layout from "../../config/layout.config.tsx";

export default function FullLoading() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.colors.onPrimary,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: layout.colors.eva02Red,
    },
    logo:{
      width: 100,
      height: 100
    }
  });

  return (
    <View style={styles.container}>
      <Image source={layout.images.logo} style={styles.logo} />
      <ActivityIndicator size="large" color={'white'} />
    </View>
  );
}
