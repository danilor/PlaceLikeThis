
import {Image, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  photo: string;
  width?: string;
  height?: string;
};

export default function Base64Image(props: Props) {
  let {photo, width, height} = props;
  if (width === undefined || width === '') {
    width = '100%';
  }
  if (height === undefined || height === '') {
    height = undefined;
  }

  const styles = StyleSheet.create({
    image: {
      // @ts-ignore
      width: width,
      // @ts-ignore
      height: height,
    },
  });

  // @ts-ignore
  return (<Image  source={{uri: `data:image/jpeg;base64,${photo}`}} style={styles.image} />);
}
