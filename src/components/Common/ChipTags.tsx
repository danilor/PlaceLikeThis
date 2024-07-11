import {Chip} from 'react-native-paper';
import React from 'react';
import {View} from 'react-native';

type Props = {
  navigation: any;
  tags: string;
  style?: any;
};

export default function ChipTags({navigation, tags, style}: Props) {
  const divideAllTags = (tags: string): string[] => {
    if (tags === '') {
      return [];
    }

    // @ts-ignore
    return tags
      .replaceAll(';', ',')
      .replaceAll(' ', ',')
      .split(',')
      .filter((tag: string) => tag !== '' && tag !== ' ' && tag !== ';');
  };

  const chipPressed = (tag: string) => {
    navigation.navigate('SearchResults', {searchQuery: tag});
  };

  return (
    <View style={style}>
      {divideAllTags(tags.toString()).map((tag, index) => {
        return (
          <Chip
            key={index}
            compact={true}
            icon="information"
            onPress={() => chipPressed(tag.toString())}>
            {tag}
          </Chip>
        );
      })}
    </View>
  );
}
