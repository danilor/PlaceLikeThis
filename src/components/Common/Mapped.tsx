// import WebView from 'react-native-webview';
import React from 'react';
import {StyleSheet} from 'react-native';
import layout from '../../config/layout.config.tsx';
import {TouchableRipple} from 'react-native-paper';
import openMap from 'react-native-open-maps';

export default class Mapped extends React.Component<{
  latitude: number;
  longitude: number;
  zoom: number;
  height: number;
}> {
  static defaultProps = {zoom: 19, height: 450};

  openCurrentLocation(lat: number, long: number) {
    console.log('Open current location');
    console.log(lat, long);
    openMap({
      latitude: parseFloat(lat.toString()),
      longitude: parseFloat(long.toString()),
      zoom: 18,
    });
  }

  render() {
    let {latitude, longitude, zoom, height} = this.props;
    const styles = StyleSheet.create({
      map: {
        flex: 1,
        height: height,
        width: '100%',
      },
    });
    return (
      <TouchableRipple
        onPress={() => {
          this.openCurrentLocation(latitude, longitude);
        }}>
      {/*  <WebView*/}
      {/*    originWhitelist={['*']}*/}
      {/*    source={{*/}
      {/*      html: `<html>*/}
      {/*    <body>*/}
      {/*      <iframe width="100%" height="100%" frameborder="0" style="border:0"*/}
      {/*src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=${zoom.toString()}&output=embed&sensor=false" allowfullscreen></iframe>*/}
      {/*    </body>*/}
      {/*</html>`,*/}
      {/*    }}*/}
      {/*    style={styles.map}*/}
      {/*  />*/}
      </TouchableRipple>
    );
  }
}
