import {CameraOptions} from 'react-native-image-picker';

const cameraConfig: CameraOptions = {
  mediaType: 'photo',
  quality: 0.8,
  saveToPhotos: false,
  includeBase64: true,
  cameraType: 'back',
  maxWidth: 1000,
  maxHeight: 1000,
};
export default cameraConfig;
