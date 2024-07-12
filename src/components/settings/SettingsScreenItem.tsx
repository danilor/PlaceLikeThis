import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {saveSettings} from '../../lib/database.lib.tsx';
import {setSettings} from '../../store/reducers/settingsSlice';
import {StyleSheet, View} from 'react-native';
import layout from '../../config/layout.config.tsx';
import DropDownPicker from 'react-native-dropdown-picker';
import {Divider, Icon, Switch, Text} from 'react-native-paper';

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
  divider = false,
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
