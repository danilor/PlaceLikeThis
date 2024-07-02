import {Text} from 'react-native-paper';
import layout from '../../config/layout.config.tsx';
import {StyleSheet, View} from 'react-native';

export default function NoLocations() {
  return (
    <View style={styles.container}>
      <Text>No places added</Text>
      <Text>Start adding them pushing the plus [+] button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
