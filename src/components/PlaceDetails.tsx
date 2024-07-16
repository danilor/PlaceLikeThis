import PlaceInformation from '../Models/PlaceInformation.model.tsx';
import {ScrollView, Share, ShareContent, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import {
  Button,
  Card,
  Dialog,
  Icon,
  MD3Theme,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import { cleanNameSafe, exportPlaces, getRandomInt } from "../lib/util.lib.tsx";
import Base64Image from './Common/Base64Image.tsx';
import messages from '../config/messages.config.tsx';
import Mapped from './Common/Mapped.tsx';
import {deleteLocation} from '../lib/database.lib.tsx';
import {decrement} from '../store/reducers/counterSlice';
import {useDispatch} from 'react-redux';
import ChipTags from './Common/ChipTags.tsx';
import files from '../config/files.config.tsx';

type Props = {
  navigation: any;
  route: any;
  options: any;
  back: any;
};

export default function PlaceDetails({navigation, route}: Props) {
  const [headerImage] = useState(
    layout.images.houses[getRandomInt(0, layout.images.houses.length - 1)],
  );

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [visibleSnack, setVisibleSnack] = React.useState(false);

  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);

  const onDismissSnackBar = () => setVisibleSnack(false);

  const dispatch = useDispatch();

  const theme: MD3Theme = useTheme();
  const location: PlaceInformation = route.params.location;
  const iconSize: number = 35;

  const deleteSingleLocation = async () => {
    console.log('Delete Location', location.id);
    hideDialog();
    // @ts-ignore
    await deleteLocation(location.id);
    dispatch(decrement());
    navigation.popToTop();
  };

  const editSingleLocation = () => {
    navigation.navigate('Form', {location: location});
  };

  const exportLocation = () => {
    const fileName = cleanNameSafe(location!.title) + files.extension;
    console.log('Exporting ' + fileName + '...');
    // @ts-ignore
    exportPlaces({
      // @ts-ignore
      id: location!.id,
      filename: fileName,
    })
      .then(() => {
        console.log('Exported');
      })
      .catch(() => {
        onToggleSnackBar();
      });
  };

  useEffect(() => {
    navigation.setParams({title: location.title, headerTitle: location.title});
    navigation.setOptions({title: location.title, headerTitle: location.title});
  }, []);

  return (
    <ScrollView style={layout.styles.generalContainer}>
      <View style={styles.actionButtons}>
        <Button
          style={styles.actionButton}
          compact={true}
          icon="export"
          mode="contained"
          onPress={exportLocation}>
          Export
        </Button>
        <Button
          style={styles.actionButton}
          compact={true}
          icon="share"
          mode="contained"
          onPress={() => {
            console.log('Share');
            const shareContent: ShareContent = {
              title: location.title,
              message:
                'https://www.google.com/maps/search/?api=1&query=' +
                location.latitude +
                ',' +
                location.longitude,
            };

            Share.share(shareContent)
              .then((res: any) => {
                console.log(res);
              })
              .catch((err: any) => {
                err && console.log(err);
              });
          }}>
          Share
        </Button>
        <Button
          style={styles.actionButton}
          compact={true}
          icon="circle-edit-outline"
          mode="contained"
          onPress={editSingleLocation}>
          Edit
        </Button>
        <Button
          style={styles.actionButton}
          buttonColor={'red'}
          textColor={'white'}
          compact={true}
          icon="delete-circle-outline"
          mode="contained"
          onPress={showDialog}>
          Delete
        </Button>
      </View>

      <Card mode={'elevated'} style={styles.card}>
        {location.photo === null ||
          (location.photo === '' && <Card.Cover source={headerImage} />)}
        {location.photo !== null && location.photo !== '' && (
          // @ts-ignore
          <Base64Image
            // @ts-ignore
            photo={location.photo}
            width={'100%'}
            height={undefined}
          />
        )}

        <Card.Title titleVariant={'titleLarge'} title={location.title} />

        <Card.Content>
          <ChipTags
            style={styles.chipsOpened}
            navigation={navigation}
            tags={location.tags!.toString()}
          />
        </Card.Content>

        {location.description !== '' && (
          <Card.Content style={styles.row}>
            <View style={styles.icon}>
              <Icon
                color={theme.colors.primary}
                size={iconSize}
                source={'information'}
              />
            </View>
            <View style={styles.content}>
              <Text>{location.description}</Text>
            </View>
          </Card.Content>
        )}

        {location.phone !== '' && (
          <Card.Content style={styles.row}>
            <View style={styles.icon}>
              <Icon
                color={theme.colors.primary}
                size={iconSize}
                source={'phone'}
              />
            </View>
            <View style={styles.content}>
              <Text>{location.phone}</Text>
            </View>
          </Card.Content>
        )}

        <Card.Content style={styles.row}>
          <View style={styles.icon}>
            <Icon color={theme.colors.primary} size={iconSize} source={'car'} />
          </View>
          <View style={styles.content}>
            <Text>
              {Boolean(location.parking) === true
                ? messages.parking
                : messages.noParking}
            </Text>
          </View>
        </Card.Content>

        <Card.Content>
          <Mapped
            latitude={location.latitude}
            longitude={location.longitude}
            height={layout.mapSpaceSize}
          />
        </Card.Content>

        <Card.Actions>
          {/*<Button*/}
          {/*  compact={true}*/}
          {/*  icon="share"*/}
          {/*  mode="contained"*/}
          {/*  onPress={() => {*/}
          {/*    console.log('Share');*/}

          {/*    const shareContent: ShareContent = {*/}
          {/*      title: location.title,*/}
          {/*      message:*/}
          {/*        'https://www.google.com/maps/search/?api=1&query=' +*/}
          {/*        location.latitude +*/}
          {/*        ',' +*/}
          {/*        location.longitude,*/}
          {/*    };*/}

          {/*    Share.share(shareContent)*/}
          {/*      .then((res: any) => {*/}
          {/*        console.log(res);*/}
          {/*      })*/}
          {/*      .catch((err: any) => {*/}
          {/*        err && console.log(err);*/}
          {/*      });*/}
          {/*  }}>*/}
          {/*  Share*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  compact={true}*/}
          {/*  icon="circle-edit-outline"*/}
          {/*  mode="contained"*/}
          {/*  onPress={editSingleLocation}>*/}
          {/*  Edit*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  buttonColor={'red'}*/}
          {/*  textColor={'white'}*/}
          {/*  compact={true}*/}
          {/*  icon="delete-circle-outline"*/}
          {/*  mode="contained"*/}
          {/*  onPress={showDialog}>*/}
          {/*  Delete*/}
          {/*</Button>*/}
        </Card.Actions>

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
      <Snackbar
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {messages.errorExporting}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginBottom: layout.generalMargin * 2,
  },
  field: {
    marginBottom: layout.generalMargin,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.generalMargin,
  },
  modal: {
    backgroundColor: 'white',
    padding: layout.generalMargin,
    margin: layout.generalMargin,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
  },
  content: {
    flex: 5,
  },
  chipsOpened: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    gap: 5,
    marginTop: layout.generalMargin,
    marginBottom: layout.generalMargin,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: layout.generalMargin,
    marginBottom: layout.generalMargin,
    gap: 5,
  },
  actionButton: {
    flex: 1,
  },
});
