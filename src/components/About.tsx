import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Card, Divider, Text, TouchableRipple} from 'react-native-paper';
import layout from '../config/layout.config.tsx';

import React, {useState} from 'react';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import {getRandomInt} from '../lib/util.lib.tsx';

function SocialIcons() {
  const openURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.iconsContainer}>
      {layout.socialIcons.map((icon, index) => {
        // @ts-ignore
        const singleIcon = layout.images.icons[icon.icon];
        return (
          <TouchableRipple
            key={index}
            onPress={() => {
              openURL(icon.url);
            }}>
            <Card>
              {/*<Text>{icon.name}</Text>*/}
              <Card.Content>
                <Image source={singleIcon} style={styles.singleIcon} />
              </Card.Content>
            </Card>
          </TouchableRipple>
        );
      })}
    </View>
  );
}

export default function About() {
  const dated: Date = new Date();
  const year: string = dated.getFullYear().toString();
  const [headerImage] = useState(
    layout.images.houses[getRandomInt(0, layout.images.houses.length - 1)],
  );

  return (
    <View style={{...layout.styles.generalContainer}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.arkhiveContainer}>
            <Image style={styles.arkhiveLogo} source={layout.images.arkhive} />
          </View>

          <SocialIcons />

          <View style={styles.aboutContainer}>
            <Card style={styles.card}>
              <Card.Content>
                {/*<Text variant={'titleLarge'} style={styles.aboutText}>*/}
                {/*  Place Like This - The Arkhive*/}
                {/*</Text>*/}
                <Text style={styles.aboutText}>
                  All rights reserved {year} © The Arkhive
                </Text>
                <Text style={styles.aboutText}>
                  Welcome to Place Like This, your ultimate tool for saving and
                  organizing information about places and the specific items
                  they offer. Whether you're looking for that one store that
                  sells a specific battery or just want to keep track of your
                  favorite shops, Place Like This is here to make your life
                  easier.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  PURPOSE
                </Text>
                <Text style={styles.aboutText}>
                  Place Like This is designed to provide an easy and efficient
                  way for users to save detailed information about places and
                  the specific items they can find there. Unlike other
                  applications that only show the store name and location, Place
                  Like This lets you know exactly what each place sells. This
                  makes it perfect for finding specific products quickly and
                  effortlessly.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  FEATURES
                </Text>
                <View style={styles.aboutText}>
                  <Text>
                    1. Save Locations: Easily save the location of any place you
                    add to the app, ensuring you can always find it again.
                  </Text>
                  <Text>
                    2. Attach Photos: Take a photo and attach it to your saved
                    place for a visual reminder of what’s available there.
                  </Text>
                  <Text>
                    3. Search Feature: Quickly search for specific items or
                    places within your saved list.
                  </Text>
                  <Text>
                    4. Share with Friends: Share your saved places with friends
                    and family to help them find what they need.
                  </Text>
                  <Text>
                    5. Map and Navigation Display: View your saved places on a
                    map and get directions to them with ease.
                  </Text>
                  <Text>
                    6. Smart Listing: Organize your saved places with smart
                    listing features, making it simple to find exactly what you
                    need when you need it.
                  </Text>
                </View>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  TARGET AUDIENCE
                </Text>
                <Text style={styles.aboutText}>
                  Place Like This is perfect for anyone who wants a
                  comprehensive list of places and locations, ready at hand when
                  needed. Whether you're a busy professional, a dedicated
                  shopper, or just someone who likes to be organized, Place Like
                  This will help you keep track of the places you love and the
                  items they offer.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  ABOUT THE DEVELOPER
                </Text>
                <Text style={styles.aboutText}>
                  Place Like This is developed by Danilo Ramirez from The
                  Arkhive. With a commitment to creating useful and engaging
                  tools, Danilo and The Arkhive team strive to enhance the way
                  people interact with their surroundings and organize their
                  lives.
                </Text>
                <Divider style={styles.aboutText} />
                <Text style={[styles.aboutText, styles.italic]}>
                  Don't let borders separate great minds, and don't let distance
                  break bonds between friends.
                </Text>
                <Image style={styles.bottomImage} source={headerImage} />
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
  arkhiveContainer: {
    height: 150,
    // backgroundColor: layout.colors.eva02Red,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.generalMargin,
  },
  aboutContainer: {
    // backgroundColor: layout.colors.eva02Red,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.generalMargin,
  },
  arkhiveLogo: {
    width: '40%',
    height: undefined,
    aspectRatio: layout.aspectsRadio.logo,
  },
  bottomImage: {
    width: '100%',
    height: undefined,
    aspectRatio: layout.aspectsRadio.houses,
  },
  aboutText: {
    marginBottom: layout.generalMargin,
  },
  italic: {
    fontStyle: 'italic',
  },
  card: {
    marginBottom: layout.generalMargin * 2,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: layout.generalMargin,
  },
  singleIcon: {
    width: 50,
    height: undefined,
    aspectRatio: 1,
  },
});
