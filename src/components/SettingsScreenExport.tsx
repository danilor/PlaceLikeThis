import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import React from 'react';
import {Card, IconButton, Snackbar, Text} from 'react-native-paper';
import {getPlaces} from '../lib/database.lib.tsx';
import PlaceInformation from '../Models/PlaceInformation.model.tsx';
import messages from '../config/messages.config.tsx';
import files from '../config/files.config.tsx';
import Share from 'react-native-share';

// @ts-ignore
export default function SettingsScreenExport({navigation}) {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const share = async (customOptions: any) => {
    console.log('Sharing...', customOptions);
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const exportData = () => {
    console.log('Exporting data...');
    getPlaces()
      .then((places: PlaceInformation[]) => {
        console.log('Places:', places.length);
        // @ts-ignore
        const data: string = JSON.stringify(
          places.map((place: PlaceInformation) => {
            delete place.id;
            return place;
          }),
        );
        // @ts-ignore

        var RNFS = require('react-native-fs');

        var path = RNFS.DownloadDirectoryPath + '/' + files.defaultExportName;

        RNFS.writeFile(path, data, 'utf8')
          .then((success: any) => {
            console.log('FILE WRITTEN!', success, path);
            share({
              title: 'Place Like This',
              message: 'Place Like This data file',
              url: files.fileProtocol + path,
              type: 'application/json',
              showAppsToView: true,
            });
          })
          .catch((err: Error) => {
            console.log(err.message);
          });
      })
      .catch((error: Error) => {
        onToggleSnackBar();
        console.error('Error exporting data:', error);
      });
  };

  // @ts-ignore
  return (
    <View style={{...layout.styles.generalContainer}}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {messages.errorExporting}
      </Snackbar>

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.text}>
                  The Export feature allows you to generate and download a
                  comprehensive file containing all stored data within the
                  application. You can save this file to your device's memory or
                  share it via social media or other platforms. Additionally,
                  this file serves as a backup, enabling you to restore your
                  data when resetting or changing devices, and import it back
                  into the application whenever needed.
                </Text>
                <Text style={styles.text}>
                  To begin, click the "Export" button below. Please note that
                  this process may take several minutes, depending on the volume
                  of data being exported.
                </Text>
                <View style={styles.buttonSpace}>
                  <IconButton
                    icon="export-variant"
                    size={60}
                    mode={'contained'}
                    onPress={exportData}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: layout.generalMargin * 2,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'justify',
    marginBottom: layout.generalMargin * 2,
  },

  buttonSpace: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
