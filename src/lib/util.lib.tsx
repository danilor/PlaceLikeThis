import PlaceInformation from '../Models/PlaceInformation.model';
import {getPlaces} from './database.lib.tsx';
import RNFS from 'react-native-fs';
import files from '../config/files.config.tsx';
import Share from 'react-native-share';

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

/**
 * This function will clean an string to be used as a filename
 * @param s
 */
export function cleanNameSafe(s: string): string {
  return s.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

type exportPlacesType = {
  id?: number;
  filename?: string;
};

export function share(customOptions: any): Promise<void> {
  console.log('Sharing...', customOptions);

  return Share.open(customOptions)
    .then((res: any) => {})
    .catch((err: Error) => {});
}

export function exportPlaces(
  {id, filename}: exportPlacesType = {id: undefined, filename: ''},
): Promise<PlaceInformation[]> {
  const errorMessage = 'Sharing failed';

  let filenameString = files.defaultExportName;
  if (filename !== '' && filename !== undefined) {
    filenameString = filename;
  }

  return new Promise((resolve, reject) => {
    getPlaces({id: id})
      .then((places: PlaceInformation[]) => {
        // @ts-ignore
        const data: string = JSON.stringify(
          places.map((place: PlaceInformation) => {
            delete place.id;
            return place;
          }),
        );
        // @ts-ignore

        const RNFS = require('react-native-fs');

        const path = RNFS.DownloadDirectoryPath + '/' + filenameString;

        RNFS.writeFile(path, data, files.fileFormat)
          .then((success: any) => {
            console.log('FILE WRITTEN!', success, path);
            share({
              title: 'Place Like This',
              message: 'Place Like This data file',
              url: files.fileProtocol + path,
              type: 'application/json',
              showAppsToView: true,
            })
              .then(() => {
                resolve(places);
              })
              .catch((err: Error) => {
                reject(errorMessage);
                console.error(err.message);
              });
          })
          .catch((err: Error) => {
            console.log(err.message);
            reject(errorMessage);
          });
      })
      .catch((error: Error) => {
        // onToggleSnackBar();
        console.error('Error exporting data:', error);
        reject(errorMessage);
      });
  });
}
