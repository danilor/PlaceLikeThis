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

import {getRandomInt} from '../lib/util.lib.tsx';

export default function License() {
  const dated: Date = new Date();
  const year: string = dated.getFullYear().toString();

  return (
    <View style={{...layout.styles.generalContainer}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.aboutContainer}>
            <Card style={styles.card}>
              <Card.Content>
                {/*<Text variant={'titleLarge'} style={styles.aboutText}>*/}
                {/*  Place Like This - The Arkhive*/}
                {/*</Text>*/}
                <Text style={styles.aboutText}>
                  Last Updated: July 18, 2024
                </Text>
                <Text style={styles.aboutText}>
                  This End User License Agreement ("Agreement") is a legal
                  agreement between you ("User") and The Arkhive ("Developer")
                  for the use of the Place Like This mobile application
                  ("Application"). By installing or using the Application, you
                  agree to be bound by the terms and conditions of this
                  Agreement.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  1. Grant of License
                </Text>
                <Text style={styles.aboutText}>
                  The Developer grants you a revocable, non-exclusive,
                  non-transferable, limited license to download, install, and
                  use the Application solely for your personal, non-commercial
                  purposes strictly in accordance with the terms of this
                  Agreement.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  2. Restrictions
                </Text>
                <Text style={styles.aboutText}>
                  You agree not to, and you will not permit others to:
                </Text>
                <View style={styles.aboutText}>
                  <Text>
                    * License, sell, rent, lease, assign, distribute, transmit,
                    host, outsource, disclose, or otherwise commercially exploit
                    the Application or make the Application available to any
                    third party.
                  </Text>
                  <Text>
                    * Modify, make derivative works of, disassemble, decrypt,
                    reverse compile, or reverse engineer any part of the
                    Application.
                  </Text>
                  <Text>
                    * Remove, alter, or obscure any proprietary notice
                    (including any notice of copyright or trademark) of The
                    Arkhive or its affiliates, partners, suppliers, or
                    licensors.
                  </Text>
                </View>

                <Text variant={'titleLarge'} style={styles.aboutText}>
                  3. Intellectual Property
                </Text>
                <Text style={styles.aboutText}>
                  The Application, including without limitation all copyrights,
                  patents, trademarks, trade secrets, and other intellectual
                  property rights, are and shall remain the sole and exclusive
                  property of The Arkhive. You shall not acquire any ownership
                  rights whatsoever by downloading or using the Application.
                </Text>

                <Text variant={'titleLarge'} style={styles.aboutText}>
                  4. Termination
                </Text>
                <Text style={styles.aboutText}>
                  This Agreement is effective until terminated by you or The
                  Arkhive. Your rights under this Agreement will terminate
                  automatically without notice from The Arkhive if you fail to
                  comply with any term(s) of this Agreement. Upon termination of
                  this Agreement, you shall cease all use of the Application and
                  delete all copies of the Application from your devices.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  5. Disclaimer of Warranties
                </Text>
                <Text style={styles.aboutText}>
                  The Application is provided "AS IS" and "AS AVAILABLE" and
                  with all faults and defects without warranty of any kind. To
                  the maximum extent permitted under applicable law, The
                  Arkhive, on its own behalf and on behalf of its affiliates and
                  its and their respective licensors and service providers,
                  expressly disclaims all warranties, whether express, implied,
                  statutory, or otherwise, with respect to the Application.
                </Text>

                <Text variant={'titleLarge'} style={styles.aboutText}>
                  6. Limitation of Liability
                </Text>
                <Text style={styles.aboutText}>
                  Notwithstanding any damages that you might incur, the entire
                  liability of The Arkhive and any of its suppliers under any
                  provision of this Agreement and your exclusive remedy for all
                  of the foregoing shall be limited to the amount actually paid
                  by you for the Application.
                </Text>
                <Text variant={'titleLarge'} style={styles.aboutText}>
                  7. Governing Law
                </Text>
                <Text style={styles.aboutText}>
                  This Agreement and all matters arising out of or relating to
                  this Agreement shall be governed by and construed in
                  accordance with the internal laws of the jurisdiction in which
                  The Arkhive is located, without giving effect to any choice or
                  conflict of law provision or rule.
                </Text>
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
