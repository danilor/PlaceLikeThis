interface PlaceInformation {
  id?: number;
  title: string;
  tags?: string;
  description?: string;
  phone?: string;
  photo?: string;
  parking?: boolean;
  latitude: number;
  longitude: number;
}

export default PlaceInformation;
