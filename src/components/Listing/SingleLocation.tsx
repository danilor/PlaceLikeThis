import {
  Avatar,
  Button,
  Card,
  Chip,
  Dialog,
  Icon,
  IconButton,
  Portal,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import layout from '../../config/layout.config.tsx';
import PlaceInformation from '../../Models/PlaceInformation.model.tsx';
import Mapped from '../Common/Mapped.tsx';
import messages from '../../config/messages.config.tsx';
import {useDispatch} from 'react-redux';
import {decrement} from '../../store/reducers/counterSlice';
import {deleteLocation} from '../../lib/database.lib.tsx';

type Props = {
  location: PlaceInformation;
  navigation: any;
};

export default function SingleLocation({location, navigation}: Props) {
  const [opened, setOpened] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const dispatch = useDispatch();

  const singleLocation: PlaceInformation = location;

  const LeftContent = () => <Avatar.Icon size={40} icon="map-marker" />;

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
              <Text style={styles.elementExtra}>{singleLocation.description}</Text>
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
      {opened && (
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
      )}

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
    marginTop: layout.generalMargin,
    marginBottom: layout.generalMargin,
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
});
