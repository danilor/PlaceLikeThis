import {Avatar, Card, Chip, IconButton, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import layout from '../../config/layout.config.tsx';
import openMap from 'react-native-open-maps';
import PlaceInformation from '../../Models/PlaceInformation.model.tsx';
import Mapped from "../Common/Mapped.tsx";

export default function SingleLocation(props: any) {
  const [opened, setOpened] = React.useState(false);

  const location: PlaceInformation = props.location;

  const LeftContent = (props: any) => (
    <Avatar.Icon {...props} icon="map-marker" />
  );
  const openCurrentLocation = (lat: number, long: number) => {
    console.log('Open current location');
    openMap({
      latitude: lat,
      longitude: long,
      zoom: 18,
    });
  };
  const divideAllTags = (tags: string): string[] => {
    // @ts-ignore
    return tags
      .replaceAll(';', ',')
      .replaceAll(' ', ',')
      .split(',')
      .filter((tag: string) => tag !== '' && tag !== ' ' && tag !== ';');
  };

  return (
    <Card mode={'outlined'} style={styles.card} onPress={()=>{setOpened(!opened)}}>
      <Card.Title
        titleVariant={'titleLarge'}
        title={location.title}
        // subtitle={}
        left={LeftContent}
        right={props => (
          <View style={styles.row}>
            <IconButton
              {...props}
              icon={'map-marker'}
              onPress={() => {
                // console.log('Toggle Map');
                openCurrentLocation(location.lat, location.long);
              }}
            />
          </View>
        )}
      />

      <Card.Content style={(opened?styles.chipsOpened:styles.chips)}>
        {location.tags !== '' &&
          // @ts-ignore
          divideAllTags(location.tags.toString()).map((tag, index) => {
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

      {opened?
        <Card.Content>
          <Mapped
            latitude={location.lat}
            longitude={location.long}
            height={195}
          />
          <Card.Content>
            <Text>
              {location.description !== ''
                ? location.description
                : 'No Description Provided'}
            </Text>
          </Card.Content>
        </Card.Content>
        :null
      }

      {/*<Card.Content>*/}
      {/*  <Text variant="bodyMedium">*/}
      {/*    {location.description !== ''*/}
      {/*      ? location.description*/}
      {/*      : 'No Description Provided'}*/}
      {/*  </Text>*/}
      {/*</Card.Content>*/}
      {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
      {/*<Card.Actions>*/}
      {/*  <Button>Cancel</Button>*/}
      {/*  <Button>Ok</Button>*/}
      {/*</Card.Actions>*/}
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
});
