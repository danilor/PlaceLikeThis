import {
  Avatar,
  Button,
  Card,
  Chip,
  Dialog,
  Icon,
  IconButton,
  MD3Theme,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {Image, ImageBase, StyleSheet, View} from 'react-native';
import React from 'react';
import layout from '../../config/layout.config.tsx';
import PlaceInformation from '../../Models/PlaceInformation.model.tsx';
import Mapped from '../Common/Mapped.tsx';
import messages from '../../config/messages.config.tsx';
import {useDispatch} from 'react-redux';
import {decrement} from '../../store/reducers/counterSlice';
import {deleteLocation} from '../../lib/database.lib.tsx';
import Base64Image from '../Common/Base64Image.tsx';

type Props = {
  location: PlaceInformation;
  navigation: any;
};

export function SingleLocation_backup({location, navigation}: Props) {
  const [opened, setOpened] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const dispatch = useDispatch();

  const singleLocation: PlaceInformation = location;

  const LeftContent = () => <Avatar.Icon size={45} icon="map-marker" />;

  const divideAllTags = (tags: string): string[] => {
    // @ts-ignore
    return tags
      .replaceAll(';', ',')
      .replaceAll(' ', ',')
      .split(',')
      .filter((tag: string) => tag !== '' && tag !== ' ' && tag !== ';');
  };

  const editSingleLocation = () => {
    navigation.navigate('Form', {location: singleLocation});
  };

  const deleteSingleLocation = async () => {
    console.log('Delete Location', singleLocation.id);
    hideDialog();
    // @ts-ignore
    await deleteLocation(singleLocation.id);
    dispatch(decrement());
  };

  const extrasIconSize = 40;

  return (
    <Card mode={'outlined'} style={styles.card}>
      <TouchableRipple
        onPress={() => {
          setOpened(!opened);
        }}>
        <Card.Title
          titleVariant={'titleLarge'}
          title={singleLocation.title}
          // subtitle={}
          left={LeftContent}
          right={props => (
            <View style={styles.row}>
              <IconButton
                {...props}
                style={{...(opened ? styles.notRotated : styles.rotated)}}
                icon={'apple-keyboard-control'}
                onPress={() => {
                  // console.log('Toggle Map');
                  // openCurrentLocation(location.lat, location.long);
                  setOpened(!opened);
                }}
              />
            </View>
          )}
        />
      </TouchableRipple>

      <Card.Content style={opened ? styles.chipsOpened : styles.chips}>
        {singleLocation.tags !== '' &&
          // @ts-ignore
          divideAllTags(singleLocation.tags.toString()).map((tag, index) => {
            return (
              <Chip
                key={index}
                icon="information"
                onPress={() => console.log('Pressed', tag)}>
                {tag}
              </Chip>
            );
          })}
      </Card.Content>

      {opened ? (
        <View>
          <Card.Content style={{marginBottom: layout.generalMargin}}>
            <Mapped
              latitude={singleLocation.latitude}
              longitude={singleLocation.longitude}
              height={195}
            />
          </Card.Content>
          {singleLocation.description !== '' && (
            <Card.Content style={styles.elementExtraContainer}>
              <Icon source="information" size={40} />
              <Text style={styles.elementExtra}>
                {singleLocation.description}
              </Text>
            </Card.Content>
          )}
          {singleLocation.phone !== '' && (
            <Card.Content style={styles.elementExtraContainer}>
              <Icon source="phone" size={extrasIconSize} />
              <Text style={styles.elementExtra}>{singleLocation.phone}</Text>
            </Card.Content>
          )}

          <Card.Content style={styles.elementExtraContainer}>
            <Icon source="car" size={extrasIconSize} />
            <Text style={styles.elementExtra}>
              {singleLocation.parking ? messages.parking : messages.noParking}
            </Text>
          </Card.Content>

          {/*<Card.Content style={styles.elementExtraContainer}>*/}
          {/*  <Icon source="identifier" size={extrasIconSize} />*/}
          {/*  <Text style={styles.elementExtra}>{location.id}</Text>*/}
          {/*</Card.Content>*/}

          {/*<Card.Content>*/}
          {/*  <Text>*/}
          {/*    {location.latitude} {location.longitude}*/}
          {/*  </Text>*/}
          {/*</Card.Content>*/}
          <Card.Actions>
            <Button
              compact={true}
              icon="circle-edit-outline"
              mode="contained"
              onPress={editSingleLocation}>
              Edit
            </Button>
            <Button
              buttonColor={'red'}
              textColor={'white'}
              compact={true}
              icon="delete-circle-outline"
              mode="contained"
              onPress={showDialog}>
              Delete
            </Button>
          </Card.Actions>
        </View>
      ) : null}

      {/*<Card.Content>*/}
      {/*  <Text variant="bodyMedium">*/}
      {/*    {location.description !== ''*/}
      {/*      ? location.description*/}
      {/*      : 'No Description Provided'}*/}
      {/*  </Text>*/}
      {/*</Card.Content>*/}
      {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{messages.deletingALocation}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{messages.deleteBody}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={deleteSingleLocation}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Card>
  );
}

export default function SingleLocation({location, navigation}: Props) {
  const theme: MD3Theme = useTheme();

  const divideAllTags = (tags: string): string[] => {
    // @ts-ignore
    return tags
      .replaceAll(';', ',')
      .replaceAll(' ', ',')
      .split(',')
      .filter((tag: string) => tag !== '' && tag !== ' ' && tag !== ';');
  };

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
      <Card mode={'outlined'} style={styles.card}>
        <Card.Content style={styles.row}>
          <View style={styles.viewImage}>
            <TouchableRipple onPress={()=>{goToDetails()}}>
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
            <TouchableRipple onPress={()=>{goToDetails()}}>
              <Text variant="titleLarge">{location.title}</Text>
            </TouchableRipple>

            <View style={styles.chips}>
              {location.tags !== '' &&
                // @ts-ignore
                divideAllTags(location.tags.toString()).map((tag, index) => {
                  return (
                    <Chip
                      key={index}
                      compact={true}
                      icon="information"
                      onPress={() => console.log('Pressed', tag)}>
                      {tag}
                    </Chip>
                  );
                })}
            </View>
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
});
