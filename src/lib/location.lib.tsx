import GetLocation from 'react-native-get-location';

export function getGeoLocation() {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,

    })
      .then(location => {
        resolve(location);
      })
      .catch(error => {
        const {code, message} = error;
        reject(code);
      });
  });
}
