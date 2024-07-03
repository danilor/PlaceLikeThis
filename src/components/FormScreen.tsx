import {ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {getRandomInt} from '../lib/util.lib.tsx';
import React, {useEffect, useState} from 'react';
import {getGeoLocation} from '../lib/location.lib.tsx';
import openMap from 'react-native-open-maps';
import Mapped from './Common/Mapped.tsx';
import messages from '../config/messages.config.tsx';
import PlaceInformation from '../Models/PlaceInformation.model.tsx';
import {savePlace} from '../lib/database.lib.tsx';
import {useDispatch} from 'react-redux';
import {increment} from '../store/reducers/counterSlice';

// @ts-ignore
export default function FormScreen({navigation, route, options, back}) {
  const [headerImage] = useState(
    layout.images.houses[getRandomInt(0, layout.images.houses.length - 1)],
  );

  const [permission, setPermission] = useState(-1);
  const [showMap, setShowMap] = useState(false);

  const [formInformation, setFormInformation] = useState<PlaceInformation>({
    title: '',
    latitude: 0,
    longitude: 0,
    tags: '',
    description: '',
    phone: '',
    photo: '',
    parking: false,
  });

  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
        navigation.popToTop();
      })
      .catch(error => {
        console.error('Error saving the information', error);
      });
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
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
  }, []);

  // @ts-ignore
  return (
    <ScrollView style={layout.styles.generalContainer}>
      {permission === -1 && (
        <ActivityIndicator size={'large'} animating={true} />
      )}
      {permission === 0 && (
        <Card>
          <Card.Cover source={headerImage} />

          <Card.Title
            title="Error getting location"
            // subtitle="Fill the form below"
            left={props => <Avatar.Icon {...props} icon="crosshairs-gps" />}
            // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
          />
          <Card.Content>
            <Text>
              To use this form and save new locations, please enable location
              access for this application.
            </Text>
          </Card.Content>
        </Card>
      )}
      {permission === 1 && (
        <Card mode={'outlined'}>
          {!showMap && <Card.Cover source={headerImage} />}
          {showMap && (
            <Mapped
              latitude={formInformation.latitude}
              longitude={formInformation.longitude}
              height={195}
            />
          )}
          <Card.Title
            title="Add a new Place"
            subtitle="Fill the form below"
            left={props => <Avatar.Icon {...props} icon="map-marker" />}
            right={props => (
              <View style={styles.row}>
                <IconButton
                  {...props}
                  icon={!showMap ? 'map' : 'map-minus'}
                  onPress={() => {
                    toggleMap();
                  }}
                />
                {/*<IconButton*/}
                {/*  {...props}*/}
                {/*  icon="map-marker"*/}
                {/*  onPress={() => {*/}
                {/*    openCurrentLocation();*/}
                {/*  }}*/}
                {/*/>*/}
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

            {/*<TextInput
              style={styles.field}
              label="Latituded (Reaonly)"
              value={formInformation.lat.toString()}
              onChangeText={value => setField('lat', value.toString())}
              readOnly={true}
            />
            <TextInput
              style={styles.field}
              label="Longitude (Reaonly)"
              value={formInformation.long.toString()}
              onChangeText={value => setField('long', value.toString())}
              readOnly={true}
            />*/}
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
          </Portal>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
