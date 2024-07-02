import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet, View
} from "react-native";
import layout from '../../config/layout.config.tsx';

const Scrollable = (props: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      // resizeMode="repeat"
      // source={layout.images.pattern}
      style={styles.container}>
      <SafeAreaView>
        {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {props.children}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width, //for full screen
    height: Dimensions.get('window').height, //for full screen
    padding: layout.generalMargin,
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
});

export default Scrollable;
