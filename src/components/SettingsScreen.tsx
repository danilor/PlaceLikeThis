import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import layout from '../config/layout.config.tsx';
import React, {useEffect, useState} from 'react';
import {Divider, Icon, Switch, Text} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getSettings, saveSettings} from '../lib/database.lib.tsx';
import {setSettings} from '../store/reducers/settingsSlice';

type itemProps = {
  label: string;
  name: string;
  type: string;
  icon?: string;
  divider?: boolean;
  info?: string;
  items?: any[];
  zIndex?: number;
  zIndexInverse?: number;
};

export function SettingsScreenItem({
  label,
  name,
  icon,
  type = 'switch',
  divider = true,
  info = '',
  items = [],
  zIndex = 0,
  zIndexInverse = 0,
}: itemProps) {
  const [switchValue, setSwitchValue] = useState(false as boolean);
  const [stringValue, setStringValue] = useState('' as string);
  const [open, setOpen] = useState(false);
  const [itemsValues, setItemsValues] = useState(items);

  const settingValue = useSelector((state: any) => state.settings.value[name]);

  // console.log('Setting Value', name, settingValue);

  const dispatch = useDispatch();


  const saveSingleSetting = async (value: string) => {
    const settings = await saveSettings(name, value.toString(), 'REPLACE');
    dispatch(setSettings(settings));
  };

  const saveBooleanSetting = async (value: boolean) => {
    console.log('Saving boolean setting', name, value);
    setSwitchValue(value);
    await saveSingleSetting(value.toString());
  };

  const saveStringSetting = async (value: string) => {
    console.log('Saving string setting', name, value);
    setStringValue(value);
    await saveSingleSetting(value);
  };

  useEffect(() => {
    if (
      settingValue !== undefined &&
      settingValue !== null &&
      settingValue !== ''
    ) {
      if (type === 'switch') {
        setSwitchValue(settingValue === 'true');
        console.log('Switch Value', switchValue);
      } else {
        setStringValue(settingValue);
        console.log('String Value', stringValue);
      }
    }
  }, []);

  const style = StyleSheet.create({
    single: {
      width: '100%',
      // backgroundColor: 'red',
      flexDirection: 'row',
      gap: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: layout.generalMargin,
      marginBottom: layout.generalMargin,
    },
    icon: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      flex: 10,
      justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'red',
    },
    control: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      flex: 6,
      paddingRight: layout.generalMargin,
    },
    divider: {
      marginTop: layout.generalMargin / 2,
      marginBottom: layout.generalMargin / 2,

      width: '100%',
    },
  });

  DropDownPicker.setListMode('SCROLLVIEW');

  return (
    <View>
      <View style={style.single}>
        <View style={style.icon}>
          <Icon size={32} source={icon !== '' ? icon : 'tools'} />
        </View>
        <View style={style.label}>
          <Text variant={'bodyLarge'}>{label}</Text>
        </View>
        <View style={style.control}>
          {type === 'switch' && (
            <Switch
              value={switchValue}
              onValueChange={v => {
                const r = saveBooleanSetting(v);
              }}
            />
          )}

          {type === 'info' && <Text>{info}</Text>}

          {type === 'select' && (
            <DropDownPicker
              open={open}
              value={stringValue}
              items={itemsValues}
              setOpen={setOpen}
              setValue={setStringValue}
              setItems={setItemsValues}
              onChangeValue={(value: any) => {
                const r = saveStringSetting(value);
              }}
              placeholder={'Select'}
              zIndex={zIndex}
              zIndexInverse={zIndexInverse}
            />
          )}
        </View>
      </View>

      {divider && <Divider style={style.divider} bold={true} />}
    </View>
  );
}

type blockProps = {
  navigation: any;
  title?: string;
  icon?: string;
  children: any;
  elevated?: boolean;
};

export function SettingScreenBlock(
  {navigation, title, children, icon}: blockProps,
  elevated = true,
) {
  const style = StyleSheet.create({
    block: {
      backgroundColor: 'white',
      minHeight: 50,
      elevation: elevated ? 8 : 0,
      width: '100%',
      paddingTop: layout.generalMargin / 2,
      paddingBottom: layout.generalMargin / 2,
      marginTop: layout.generalMargin,
      marginBottom: layout.generalMargin,
    },
    titleSpace: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 5,
      marginTop: layout.generalMargin,
    },
    title: {
      flex: 13,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    icon: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View>
      <View style={style.titleSpace}>
        {icon !== '' && (
          <View style={style.icon}>
            <Icon size={40} source={icon} />
          </View>
        )}
        {title !== '' && (
          <View style={style.title}>
            <Text variant={'titleLarge'}>{title}</Text>
          </View>
        )}
      </View>

      <View style={style.block}>{children}</View>
    </View>
  );
}

// @ts-ignore
export default function SettingsScreen({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  // @ts-ignore
  return (
    <View style={{...layout.styles.sideStretchContainer}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SettingScreenBlock
            navigation={navigation}
            title="Camera Settings"
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
            />

            <SettingsScreenItem
              icon={'camera-image'}
              label={'Save to Gallery'}
              name={'saveGallery'}
              type={'switch'}
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
