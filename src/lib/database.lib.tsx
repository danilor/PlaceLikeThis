import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import dbConfig from '../config/db.config.tsx';
import PlaceInformation from '../Models/PlaceInformation.model.tsx';

enablePromise(true);

export const getDBConnection = async () => {
  // console.log('DB Connection');
  // @ts-ignore
  return openDatabase({name: dbConfig.dbName, location: dbConfig.location});
};

export const createTable = async (db: SQLiteDatabase) => {
  // console.log('Creating table if it does not exist');
  // create table if not exists
  //   id INTEGER PRIMARY KEY,
  const query = `
  
CREATE TABLE IF NOT EXISTS ${dbConfig.tables.places} (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  tags TEXT NOT NULL,
  description TEXT NOT NULL,
  phone TEXT NOT NULL,
  photo TEXT NOT NULL,
  parking BOOLEAN DEFAULT 0,
  latitude TEXT NOT NULL,
  longitude TEXT NOT NULL,
  created_at date
);
  `;

  await db.executeSql(query);

  const query2 = `
  
CREATE TABLE IF NOT EXISTS ${dbConfig.tables.settings} (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
  `;

  await db.executeSql(query2);
};

export const initializeDB = async () => {
  // console.log('Initializing DB');
  const db = await getDBConnection();
  await createTable(db);
  return db;
};

export const savePlace = async (place: PlaceInformation) => {
  const db = await getDBConnection();
  // console.log('Saving Place');

  let query: string = '';

  if (place.id !== undefined && place.id !== null && place.id !== 0) {
    query = `UPDATE ${dbConfig.tables.places} 
    SET 
      title = '${place.title}', 
      tags = '${place.tags}', 
      description = '${place.description}', 
      phone = '${place.phone}',
      photo = '${place.photo}',
      parking = ${place.parking},
      latitude = '${place.latitude}', 
      longitude = '${place.longitude}'
    WHERE id = ${place.id};`;
  } else {
    query = `INSERT INTO ${dbConfig.tables.places} 
    (
      id, 
      title, 
      tags, 
      description, 
      phone,
      photo,
      parking,
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
      '${place.phone}',
      '${place.photo}',
      ${place.parking},
      '${place.latitude}', 
      '${place.longitude}', 
      '${new Date().toISOString().split('T')[0]}'
      )
      `;
  }

  // console.log('Query saved');
  return db.executeSql(query);
};

export const getPlaces = async (
  search: string = '',
): Promise<PlaceInformation[]> => {
  // console.log('Getting all places');
  try {
    const db = await getDBConnection();
    const items: PlaceInformation[] = [];
    let query = `SELECT * FROM ${dbConfig.tables.places} ORDER BY id DESC;`;
    if (search !== '') {
      console.log('Querying with search', search);
      query = `SELECT 
                    * FROM ${dbConfig.tables.places} 
                WHERE title LIKE '%${search}%' 
                    OR tags LIKE '%${search}%' 
                    OR description LIKE '%${search}%' 
                ORDER BY id DESC;`;
    }
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    // console.log('Places', items);
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Places from database !!!');
  }
};


export const getSettings = async () => {
  const db = await getDBConnection();
  const items: any = {};
  const query = `SELECT * FROM ${dbConfig.tables.settings};`;
  const results = await db.executeSql(query);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      items[result.rows.item(index).key] = result.rows.item(index).value;
    }
  });
  return items;
};

export const deleteLocation = async (id: number) => {
  const db = await getDBConnection();
  const deleteQuery = `DELETE from ${dbConfig.tables.places} where id = ${id}`;
  await db.executeSql(deleteQuery);
};
