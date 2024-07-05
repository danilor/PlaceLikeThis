
import {Image, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  photo: string;
  width?: string;
  height?: string;
  aspectRadio?: number;
  objectFit?: string;
};

export default function Base64Image(props: Props) {
  let {photo, width, height, aspectRadio, objectFit} = props;
  if (width === undefined || width === '') {
    width = '100%';
  }
  if (height === undefined || height === '') {
    height = undefined;
  }
  if (aspectRadio === undefined || aspectRadio === 0) {
    aspectRadio = 1;
  }
  if (objectFit === undefined || objectFit === '') {
    objectFit = 'cover';
  }

  const styles = StyleSheet.create({
    image: {
      // @ts-ignore
      width: width,
      // @ts-ignore
      height: height,
      aspectRatio: aspectRadio,
      // @ts-ignore
      objectFit: objectFit,
    },
  });

  // @ts-ignore
  return (<Image  source={{uri: `data:image/jpeg;base64,${photo}`}} style={styles.image} />);
}
