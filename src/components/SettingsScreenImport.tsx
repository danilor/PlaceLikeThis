import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import React from 'react';
import {Card, IconButton, Snackbar, Text} from 'react-native-paper';

import messages from '../config/messages.config.tsx';
import * as RNFS from 'react-native-fs';
import picker from 'react-native-document-picker';
import files from '../config/files.config.tsx';
import PlaceInformationModel from '../Models/PlaceInformation.model.tsx';
import {savePlace} from '../lib/database.lib.tsx';
import {useDispatch} from 'react-redux';
import {increment} from '../store/reducers/counterSlice';

// @ts-ignore
export default function SettingsScreenImport({navigation}) {
  const [visible, setVisible] = React.useState(false);

  const [importing, setImporting] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [visibleSuccess, setVisibleSuccess] = React.useState(false);

  const onToggleSnackBarSuccess = () => setVisibleSuccess(!visibleSuccess);

  const onDismissSnackBarSuccess = () => setVisibleSuccess(false);

  const dispatch = useDispatch();

  const pickDocument = async () => {
    console.log('Picking document...');
    setImporting(true);
    picker
      .pickSingle({
        allowMultiSelection: false,
        type: files.mimeType,
      })
      .then((res: any) => {
        // console.log('Document selected:', res);
        RNFS.readFile(res.uri, files.fileFormat)
          .then(async res => {
            // console.log(res);
            try {
              const d: PlaceInformationModel[] = JSON.parse(res);
              // console.log(d);
              for (let i = 0; i < d.length; i++) {
                await savePlace(d[i]);
              }
              // onToggleSnackBarSuccess();
              dispatch(increment());
              navigation.popToTop();
              setImporting(false);
            } catch (err) {
              console.error('Error importing file');
              setImporting(false);
              // console.error(err);
              onToggleSnackBar();
            }
          })
          .catch(err => {
            console.log(err.message, err.code);
            setImporting(false);
            onToggleSnackBar();
          });
        setImporting(false);
      })
      .catch((err: any) => {
        setImporting(false);
        onToggleSnackBar();
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
        {messages.successImporting}
      </Snackbar>

      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSnackBarSuccess}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {messages.errorImporting}
      </Snackbar>

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.text}>
                  Importing a file will add all the locations from that file to
                  your local storage. This may result in duplicate entries,
                  which will need to be resolved manually. To start, click the
                  "Import" button below. Please be aware that this process may
                  take several minutes, depending on the volume of data being
                  imported.
                </Text>
                <View style={styles.buttonSpace}>
                  <IconButton
                    icon="import"
                    size={layout.exportImportButtonSize}
                    mode={'contained'}
                    onPress={pickDocument}
                    loading={importing}
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
