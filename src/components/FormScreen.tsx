import {Image, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {getRandomInt} from '../lib/util.lib.tsx';
import React, {useEffect, useState} from 'react';
import {getGeoLocation} from '../lib/location.lib.tsx';
import Mapped from './Common/Mapped.tsx';
import messages from '../config/messages.config.tsx';
import PlaceInformation from '../Models/PlaceInformation.model.tsx';
import {savePlace} from '../lib/database.lib.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../store/reducers/counterSlice';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import cameraConfig from '../config/camera.config.tsx';
import NoLocationPermissions from './Form/NoLocationPermissions.tsx';
import Base64Image from './Common/Base64Image.tsx';

type Props = {
  navigation: any;
  route: any;
  options: any;
  back: any;
};

export default function FormScreen({navigation, route, options, back}: Props) {
  let initialPermission = -1;
  /**
   * The initial state of the form. This will help us
   * when we need to edit an item
   */
  let initialState = {
    id: null,
    title: '',
    latitude: 0,
    longitude: 0,
    tags: '',
    description: '',
    phone: '',
    photo: '',
    parking: false,
  };

  /**
   * Settings
   */
  const setting = useSelector((state: any) => state.settings.value);

  // console.log('Route', route.params);

  if (
    route.params !== undefined &&
    route.params.location !== undefined &&
    route.params.location !== null
  ) {
    console.log('Route incoming with params of location');
    initialState = route.params.location;
    initialPermission = 1;
  }

  /**
   * The formInformation object
   */
  const [formInformation, setFormInformation] =
    useState<PlaceInformation>(initialState);

  /**
   * We are showing a random image every time the form is opened
   */
  const [headerImage] = useState(
    layout.images.houses[getRandomInt(0, layout.images.houses.length - 1)],
  );

  /**
   * The permission state will help us to know if we can get the location
   * -1 means asking
   * 0 means denied
   * 1 means granted
   */

  const [permission, setPermission] = useState(initialPermission);
  const [snackBarCameraVisible, setSnackBarCameraVisible] = useState(false);
  const onToggleSnackBarCamera = () => setSnackBarCameraVisible(!visible);
  const onDismissSnackBarCamera = () => setSnackBarCameraVisible(false);

  /**
   * If the user wants to see the map instead of the image
   */
  const [showMap, setShowMap] = useState(false);
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  /**
   * This dispatch is only to notify the first page to reload all information
   * with the new element
   */
  const dispatch = useDispatch();

  /**
   * This will control the modal when showing errors
   */
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  /******************************************************/

  /**
   * This function will help us to set the value of the fields
   * @param field
   * @param value
   * */
  const setField = (field: string, value: string) => {
    setFormInformation({...formInformation, [field]: value});
  };
  const setFieldBoolean = (field: string, value: boolean) => {
    setFormInformation({...formInformation, [field]: value});
  };

  const cancelButton = () => {
    navigation.goBack();
  };

  const submitButton = () => {
    console.log('Submit button pressed');
    /**
     * I will manually validate the fields since they are just a few of them,
     * but in the future we need to seek a better way to validate the form.
     */
    if (formInformation.title.trim() === '') {
      showModal();
      return;
    }
    // @ts-ignore
    if (formInformation.tags.trim() === '') {
      showModal();
      return;
    }

    savePlace(formInformation)
      .then(() => {
        console.log('Information saved');
        dispatch(increment());
        // if it was a success we return to the main page
        navigation.popToTop();
        return true;
      })
      .catch(error => {
        console.error('Error saving the information', error);
        return false;
      });
  };

  /**
   * This function will get a photo for this location
   * https://github.com/react-native-image-picker/react-native-image-picker?tab=readme-ov-file
   */
  const addAPhoto = () => {
    const config: CameraOptions = cameraConfig;
    if (setting.quality !== undefined) {
      console.log('Quality', setting.quality);
      // @ts-ignore
      config.quality = parseFloat(setting.quality);
    }
    if (setting.resolution !== undefined) {
      console.log('Resolution', setting.resolution);
      // @ts-ignore
      config.maxHeight = parseInt(setting.resolution, 10);
      config.maxWidth = parseInt(setting.resolution, 10);
    }
    if (setting.saveGallery !== undefined) {
      console.log('Save to Gallery', setting.saveGallery);
      // @ts-ignore
      config.saveToPhotos = (setting.saveGallery.toLowerCase() === 'true');
    }

    const r = launchCamera(cameraConfig, (response: ImagePickerResponse) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        onToggleSnackBarCamera();
        return;
      }

      if (response.errorCode !== undefined && response.errorCode !== null) {
        onToggleSnackBarCamera();
        return;
      }

      for (let key in response.assets) {
        // @ts-ignore
        if (
          // @ts-ignore
          response.assets[key].base64 !== undefined &&
          // @ts-ignore
          response.assets[key].base64 !== null
        ) {
          // @ts-ignore
          const base64Image = response.assets[key].base64;
          // console.log('Base64', base64Image.substring(0, 100));
          setFormInformation({
            ...formInformation,
            photo: base64Image,
          });
          // console.log('Updated formInformation', formInformation);
        }
      }
    });
  };

  /**
   * This should only happen if the latitude and longitude are 0
   */
  useEffect(() => {
    if (formInformation.latitude === 0 && formInformation.longitude === 0) {
      getGeoLocation()
        .then((location: any) => {
          console.log('Location', location);
          setPermission(1);
          setFormInformation({
            ...formInformation,
            latitude: location.latitude,
            longitude: location.longitude,
          });
        })
        .catch(error => {
          console.error('Error getting location', error);
          setPermission(0);
        });
    }
  }, []);

  // @ts-ignore

  return (
    <ScrollView style={layout.styles.generalContainer}>
      {permission === -1 && (
        <View style={styles.centered}>
          <ActivityIndicator size={'large'} animating={true} />
          <Text>Getting your location</Text>
        </View>
      )}
      {permission === 0 && <NoLocationPermissions headerImage={headerImage} />}
      {permission === 1 && (
        <Card mode={'elevated'} style={styles.card}>
          {!showMap && formInformation.photo === '' && (
            <Card.Cover source={headerImage} />
          )}

          {!showMap &&
            formInformation.photo !== null &&
            formInformation.photo !== '' && (
              <Base64Image
                // @ts-ignore
                photo={formInformation.photo}
                width={'100%'}
                // @ts-ignore
                height={layout.mapSpaceSize}
                aspectRadio={2}
                objectFit={'cover'}
              />
            )}

          {showMap && (
            <Mapped
              latitude={formInformation.latitude}
              longitude={formInformation.longitude}
              height={layout.mapSpaceSize}
            />
          )}
          <Card.Title
            title={
              formInformation.id === null
                ? messages.addNewPlace
                : messages.editPlace
            }
            subtitle={messages.fillForm}
            left={props => <Avatar.Icon {...props} icon="map-marker" />}
            right={props => (
              <View style={styles.row}>
                <IconButton
                  {...props}
                  icon={'camera'}
                  onPress={() => {
                    addAPhoto();
                  }}
                />
                <IconButton
                  {...props}
                  icon={!showMap ? 'map' : 'map-minus'}
                  onPress={() => {
                    toggleMap();
                  }}
                />
              </View>
            )}
          />
          <Card.Content>
            <View style={styles.field}>
              <TextInput
                label="Title *"
                value={formInformation.title}
                onChangeText={value => setField('title', value.toString())}
              />
            </View>

            <View style={styles.field}>
              <TextInput
                style={styles.field}
                label="Tags *"
                value={formInformation.tags}
                onChangeText={value => setField('tags', value.toString())}
              />
            </View>

            <View style={styles.field}>
              <TextInput
                style={styles.field}
                label="Description"
                multiline={true}
                numberOfLines={5}
                keyboardType={'default'}
                value={formInformation.description}
                onChangeText={value =>
                  setField('description', value.toString())
                }
              />
            </View>

            <View style={styles.field}>
              <TextInput
                style={styles.field}
                label="Phone"
                keyboardType={'phone-pad'}
                value={formInformation.phone}
                onChangeText={value => setField('phone', value.toString())}
              />
            </View>

            <View style={[styles.field, styles.row]}>
              <Switch
                value={formInformation.parking}
                onValueChange={value => {
                  // @ts-ignore
                  console.log('Parking', value);
                  setFieldBoolean('parking', value);
                }}
              />
              <Text variant={'bodyLarge'}>
                {formInformation.parking
                  ? messages.parking
                  : messages.noParking}
              </Text>
            </View>

            {/*<View style={[styles.field, styles.row, styles.centered]}>*/}
            {/*  <Button*/}
            {/*    icon="camera"*/}
            {/*    mode="contained"*/}
            {/*    compact={false}*/}
            {/*    accessibilityLabel={'Add Photo'}*/}
            {/*    onPress={addAPhoto}>*/}
            {/*    Add Photo*/}
            {/*  </Button>*/}
            {/*</View>*/}

            {/*<TextInput*/}
            {/*  style={styles.field}*/}
            {/*  label="Latituded (Reaonly)"*/}
            {/*  value={formInformation.latitude.toString()}*/}
            {/*  onChangeText={value => setField('lat', value.toString())}*/}
            {/*  readOnly={true}*/}
            {/*/>*/}
            {/*<TextInput*/}
            {/*  style={styles.field}*/}
            {/*  label="Longitude (Reaonly)"*/}
            {/*  value={formInformation.longitude.toString()}*/}
            {/*  onChangeText={value => setField('long', value.toString())}*/}
            {/*  readOnly={true}*/}
            {/*/>*/}
          </Card.Content>

          <Card.Actions>
            <Button onPress={cancelButton}>Cancel</Button>
            <Button onPress={submitButton}>Submit</Button>
          </Card.Actions>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}>
              <Text>{messages.generalError}</Text>
            </Modal>
            <Modal
              visible={snackBarCameraVisible}
              onDismiss={onDismissSnackBarCamera}
              contentContainerStyle={styles.modal}>
              <Text>{messages.cameraError}</Text>
            </Modal>
          </Portal>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginBottom: layout.generalMargin,
  },
  field: {
    marginBottom: layout.generalMargin,
  },
  row: {
    flexDirection: 'row',
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
});
