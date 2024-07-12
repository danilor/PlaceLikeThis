import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import React, {useEffect, useState} from 'react';
import {Divider, Icon, Switch, Text} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getSettings, saveSettings} from '../lib/database.lib.tsx';
import {setSettings} from '../store/reducers/settingsSlice';
import { SettingScreenBlock } from './settings/SettingScreenBlock.tsx';
import { SettingsScreenItem } from './settings/SettingsScreenItem.tsx';





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
          <SettingScreenBlock
            navigation={navigation}
            title="Camera"
            icon={'camera'}>
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

          <SettingScreenBlock
            navigation={navigation}
            title="Location"
            icon={'map'}>
            <SettingsScreenItem
              icon={'map-marker'}
              label={'Use Precise Location'}
              name={'preciseLocation'}
              type={'switch'}
              divider={false}
            />
          </SettingScreenBlock>

          <SettingScreenBlock
            navigation={navigation}
            title="Software Information"
            icon={'information'}>
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
