import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import dbConfig from '../config/db.config.tsx';
import PlaceInformation from '../Models/PlaceInformation.model.tsx';

enablePromise(true);

export const getDBConnection = async () => {
  console.log('DB Connection');
  // @ts-ignore
  return openDatabase({name: dbConfig.dbName, location: dbConfig.location});
};

export const createTable = async (db: SQLiteDatabase) => {
  console.log('Creating table if it does not exist');
  // create table if not exists
  //   id INTEGER PRIMARY KEY,
  const query = `
  
CREATE TABLE IF NOT EXISTS ${dbConfig.tables.places} (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  tags TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude TEXT NOT NULL,
  longitude TEXT NOT NULL,
  created_at date
);

  `;

  await db.executeSql(query);
};

export const initializeDB = async () => {
  console.log('Initializing DB');
  const db = await getDBConnection();
  await createTable(db);
  return db;
};

export const savePlace = async (place: PlaceInformation) => {
  const db = await getDBConnection();
  console.log('Saving Place');
  const insertQuery = `INSERT INTO ${dbConfig.tables.places} 
    (
      id, 
      title, 
      tags, 
      description, 
      latitude, 
      longitude, 
      created_at
      ) 
    values
    (
      null, 
      '${place.title}', 
      '${place.tags}', 
      '${place.description}', 
      '${place.lat}', 
      '${place.long}', 
      '${new Date().toISOString().split('T')[0]}'
      )
      `;

  console.log('Query saved');
  return db.executeSql(insertQuery);
};

export const getPlaces = async (
  search: string = '',
): Promise<PlaceInformation[]> => {
  console.log('Getting all places');
  try {
    const db = await getDBConnection();
    const items: PlaceInformation[] = [];
    let query = `SELECT * FROM ${dbConfig.tables.places} ORDER BY id DESC;`;
    if (search !== '') {
      query = `SELECT * FROM ${dbConfig.tables.places} WHERE title LIKE '%${search}%' OR tags LIKE '%${search}%' ORDER BY id DESC;`;
    }
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    console.log('Places', items);
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Places from database !!!');
  }
};
