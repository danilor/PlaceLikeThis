import {Avatar, Card, Text} from 'react-native-paper';
import React from 'react';
import messages from '../../config/messages.config.tsx';

type Props = {
  headerImage: any;
};
export default function NoLocationPermissions({headerImage}: Props) {
  return (
    <Card>
      <Card.Cover source={headerImage} />
      <Card.Title
        title={messages.noLocationTitle}
        // subtitle="Fill the form below"
        left={props => <Avatar.Icon {...props} icon="crosshairs-gps" />}
        // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
      <Card.Content>
        <Text>{messages.noLocationPermission}</Text>
      </Card.Content>
    </Card>
  );
}
