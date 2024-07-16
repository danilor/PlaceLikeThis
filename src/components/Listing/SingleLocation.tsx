import {
  Card,
  Icon,
  MD3Theme,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import layout from '../../config/layout.config.tsx';
import PlaceInformation from '../../Models/PlaceInformation.model.tsx';

import Base64Image from '../Common/Base64Image.tsx';
import ChipTags from '../Common/ChipTags.tsx';

type Props = {
  location: PlaceInformation;
  navigation: any;
};

export default function SingleLocation({location, navigation}: Props) {
  const theme: MD3Theme = useTheme();

  const iconSize: number = 35;

  const goToDetails = () => {
    console.log('Go to Details', location.title);
    navigation.navigate('PlaceDetails', {
      location: location,
      title: location.title,
    });
  };

  return (
    <View>

      <Card mode={'elevated'} style={styles.card}>
        <Card.Content style={styles.row}>
          <View style={styles.viewImage}>
            <TouchableRipple
              onPress={() => {
                goToDetails();
              }}>
              <View>
                {location.photo === '' && (
                  // @ts-ignore
                  <Image
                    source={layout.images.defaultPlace}
                    style={styles.avatarImage}
                  />
                )}
                {location.photo !== '' && (
                  // @ts-ignore
                  <Base64Image photo={location.photo} width={'100%'} />
                )}
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.viewContent}>
            <TouchableRipple
              onPress={() => {
                goToDetails();
              }}>
              <Text variant="titleLarge" style={styles.title}>
                {location.title}
              </Text>
            </TouchableRipple>
            <ChipTags
              style={styles.chips}
              navigation={navigation}
              tags={location.tags!.toString()}
            />
            <View style={styles.chips}>
              {location.description !== '' && (
                <Icon
                  source="information"
                  color={theme.colors.primary}
                  size={iconSize}
                />
              )}
              {location.phone !== '' && (
                <Icon
                  color={theme.colors.primary}
                  source="phone"
                  size={iconSize}
                />
              )}

              {Boolean(location.parking) && (
                <Icon
                  source="car"
                  color={theme.colors.primary}
                  size={iconSize}
                />
              )}
              {location.photo !== '' && (
                <Icon
                  color={theme.colors.primary}
                  source="camera"
                  size={iconSize}
                />
              )}
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  card: {
    marginBottom: layout.generalMargin,
  },
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    // marginHorizontal: 20,
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // justifyContent: 'space-between',
    gap: 5,
    // marginTop: layout.generalMargin,
    // marginBottom: layout.generalMargin,
  },
  chipsOpened: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    gap: 5,
    marginTop: layout.generalMargin,
    marginBottom: layout.generalMargin,
  },
  rotated: {
    transform: [{rotate: '180deg'}],
  },
  notRotated: {
    transform: [{rotate: '0deg'}],
  },
  elementExtraContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // justifyContent: 'space-between',
    gap: layout.generalMargin,
    // marginTop: layout.generalMargin,
    marginBottom: layout.generalMargin,
  },
  elementExtra: {
    flex: 1,
    alignSelf: 'center',
  },

  viewImage: {
    flex: 3,
  },
  avatarImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    objectFit: 'cover',
    borderRadius: 10,
  },
  viewContent: {
    flex: 8,
    marginLeft: layout.generalMargin,
  },
  title: {
    flexWrap: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row',
  },
});
