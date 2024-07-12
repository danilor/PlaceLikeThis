import {StyleSheet, View} from 'react-native';
import layout from '../../config/layout.config.tsx';
import {Icon, Text} from 'react-native-paper';
import React from 'react';

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
      elevation: elevated ? 2 : 0,
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
