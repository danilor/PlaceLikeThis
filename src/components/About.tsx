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

import React, { useState } from "react";
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import { getRandomInt } from "../lib/util.lib.tsx";

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
          <TouchableRipple key={index}
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
                  Place Like This is a project by the team at The Arkhive to
                  allows users to store information about places they have
                  visited, add information about them, make it easy to search
                  for specifics and share them with friends. The application is
                  built using React Native and Redux Toolkit.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  DISCLAIMER
                </Text>
                <Text style={styles.aboutText}>
                  The information provided by ("we," "us," or "our") on our
                  mobile application is for general informational purposes only.
                  All information on our mobile application is provided in good
                  faith, however we make no representation or warranty of any
                  kind, express or implied, regarding the accuracy, adequacy,
                  validity, reliability, availability, or completeness of any
                  information on our mobile application. UNDER NO CIRCUMSTANCE
                  SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF
                  ANY KIND INCURRED AS A RESULT OF THE USE OF OUR MOBILE
                  APPLICATION OR RELIANCE ON ANY INFORMATION PROVIDED ON OUR
                  MOBILE APPLICATION. YOUR USE OF OUR MOBILE APPLICATION AND
                  YOUR RELIANCE ON ANY INFORMATION ON OUR MOBILE APPLICATION IS
                  SOLELY AT YOUR OWN RISK.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  LICENSE
                </Text>
                <Text style={styles.aboutText}>
                  Copyright {year} © The Arkhive. Permission is hereby granted,
                  free of charge, to any person obtaining a copy of this
                  software and associated documentation files (the "Software"),
                  to deal in the Software without restriction, including without
                  limitation the rights to use, copy, modify, merge, publish,
                  distribute, sublicense, and/or sell copies of the Software,
                  and to permit persons to whom the Software is furnished to do
                  so, subject to the following conditions:
                </Text>
                <Text style={styles.aboutText}>
                  The above copyright notice and this permission notice shall be
                  included in all copies or substantial portions of the
                  Software.
                </Text>
                <Text style={styles.aboutText}>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </Text>

                <Text variant={'titleLarge'} style={styles.aboutText}>
                  SPECIAL THANKS
                </Text>
                <Text style={styles.aboutText}>
                  Special thanks to all the people who helped us to test every
                  feature of this application and provided feedback during the
                  process.
                </Text>
                <Text style={[styles.aboutText, styles.italic]}>
                  No Animals Were Harmed making this app
                </Text>
                <Divider style={styles.aboutText} />
                <Text style={[styles.aboutText, styles.italic]}>
                  Don't let borders separate great minds, and don't let distance
                  to broken bonds between friends.
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
    aspectRatio: 437 / 307,
  },
  bottomImage:{
    width: '100%',
    height: undefined,
    aspectRatio: 806 / 461,
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
