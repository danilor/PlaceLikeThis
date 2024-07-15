import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import React from 'react';

import {SettingScreenBlock} from './settings/SettingScreenBlock.tsx';
import {SettingsScreenItem} from './settings/SettingsScreenItem.tsx';

// @ts-ignore
export default function SettingsScreen({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  // @ts-ignore
  return (
    <View style={{...layout.styles.generalContainer}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SettingScreenBlock navigation={navigation} title="" icon={''}>
            <SettingsScreenItem
              icon={'image-size-select-large'}
              label={'Resolution'}
              name={'resolution'}
              type={'select'}
              items={[
                {label: '500x500', value: '500'},
                {label: '1000x1000', value: '1000'},
                {label: '1500x1500', value: '1500'},
              ]}
              zIndex={2000}
              zIndexInverse={1000}
              divider={false}
            />

            <SettingsScreenItem
              icon={'quality-high'}
              label={'Quality'}
              name={'quality'}
              type={'select'}
              items={[
                {label: 'Low', value: '0.5'},
                {label: 'Medium', value: '0.8'},
                {label: 'High', value: '1'},
              ]}
              zIndex={1000}
              zIndexInverse={2000}
              divider={false}
            />

            <SettingsScreenItem
              icon={'camera-image'}
              label={'Save to Gallery'}
              name={'saveGallery'}
              type={'switch'}
              divider={false}
            />
          </SettingScreenBlock>

          <SettingScreenBlock navigation={navigation} title="" icon={''}>
            <SettingsScreenItem
              icon={'map-marker'}
              label={'Use Precise Location'}
              name={'preciseLocation'}
              type={'switch'}
              divider={false}
            />
            <SettingsScreenItem
              icon={'export'}
              label={'Export Data'}
              name={'exportdata'}
              type={'link'}
              target={'SettingsExport'}
              divider={false}
            />
            <SettingsScreenItem
              icon={'import'}
              label={'Import Data'}
              name={'importdata'}
              type={'none'}
              target={'SettingsImport'}
              divider={false}
            />
          </SettingScreenBlock>

          <SettingScreenBlock navigation={navigation} title="" icon={''}>
            <SettingsScreenItem
              icon={'identifier'}
              label={'Version'}
              name={'version'}
              type={'info'}
              divider={false}
              info={'1.0.0'}
            />

            <SettingsScreenItem
              icon={'react'}
              label={'React Version'}
              name={'react'}
              type={'info'}
              divider={false}
              info={'18.2.0'}
            />

            <SettingsScreenItem
              icon={'react'}
              label={'React Native Version'}
              name={'react-native'}
              type={'info'}
              divider={false}
              info={'0.74.2'}
            />

            <SettingsScreenItem
              icon={'nodejs'}
              label={'Node Version'}
              name={'node'}
              type={'info'}
              divider={false}
              info={'22.3.0'}
            />
          </SettingScreenBlock>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
