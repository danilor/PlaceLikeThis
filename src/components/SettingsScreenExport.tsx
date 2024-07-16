import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import React from 'react';
import {Card, IconButton, Snackbar, Text} from 'react-native-paper';
import messages from '../config/messages.config.tsx';
import {exportPlaces} from '../lib/util.lib.tsx';

// @ts-ignore
export default function SettingsScreenExport() {
  const [visible, setVisible] = React.useState(false);

  const [exporting, setExporting] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const exportData = () => {
    console.log('Exporting data...');
    setExporting(true);
    exportPlaces()
      .then(() => {
        console.log('Exported');
        setExporting(false);
      })
      .catch(() => {
        onToggleSnackBar();
        setExporting(false);
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
                  <Text style={{fontWeight: 'bold'}}>Note:</Text> This file is
                  stored in JSON format and can be shared with other users of
                  the application. The higher the resolution of the images
                  stored, the larger the file size will be.
                </Text>
                <Text style={styles.text}>
                  To begin, click the "Export" button below. Please note that
                  this process may take several minutes, depending on the volume
                  of data being exported.
                </Text>
                <View style={styles.buttonSpace}>
                  <IconButton
                    icon="export"
                    size={layout.exportImportButtonSize}
                    mode={'contained'}
                    onPress={exportData}
                    loading={exporting}
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
