import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import dbConfig from '../config/db.config.tsx';
import PlaceInformation from '../Models/PlaceInformation.model.tsx';
import settings from '../config/settigs.config.tsx';

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
  key TEXT TEXT  PRIMARY KEY,
  value TEXT NOT NULL
);
  `;

  await db.executeSql(query2);
};

export const initializeDB = async () => {
  // console.log('Initializing DB');
  const db = await getDBConnection();
  await createTable(db);

  Object.keys(settings.defaultSettings).forEach(async key => {
    // @ts-ignore
    await saveSettings(
      key,
      // @ts-ignore
      settings.defaultSettings[key].toString(),
      'IGNORE',
    );
  });

  return db;
};

export const deleteSetting = async (key: string) => {
  const db = await getDBConnection();
  const deleteQuery = `DELETE from ${dbConfig.tables.settings} where key = '${key}'`;
  await db.executeSql(deleteQuery);
  return await getSettings();
};

export const saveSettings = async (
  key: string,
  value: string,
  type: string = 'REPLACE',
) => {
  if (type === 'REPLACE') {
    await deleteSetting(key);
  }

  const db = await getDBConnection();
  // console.log('Saving Settings');
  const query = `INSERT OR ${type} INTO ${dbConfig.tables.settings} 
    (
      key, 
      value
      ) 
    values
    (
      '${key}', 
      '${value}'
      )
      `;

  // console.log('Query saved', query);

  // console.log('Query saved');
  try {
    db.executeSql(query);
  } catch (error) {
    console.error(error);
  }

  return await getSettings();
};

export const savePlace = async (place: PlaceInformation) => {
  const db = await getDBConnection();
  console.log('Saving Place');

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
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error('Failed to save Place to database');
  }

  // console.log('Query saved');
  return true;
};

type getPlaceType = {
  id?: number;
  search?: string;
};

export const getPlaces = async (
  {id, search}: getPlaceType = {id: undefined, search: ''},
): Promise<PlaceInformation[]> => {
  // console.log('Getting all places');
  try {
    const db = await getDBConnection();
    const items: PlaceInformation[] = [];
    let query = `SELECT * FROM ${dbConfig.tables.places} ORDER BY id DESC;`;
    if (search !== '' && search !== undefined) {
      console.log('Querying with search', search);
      query = `SELECT 
                    * FROM ${dbConfig.tables.places} 
                WHERE title LIKE '%${search}%' 
                    OR tags LIKE '%${search}%' 
                    OR description LIKE '%${search}%' 
                ORDER BY id DESC;`;
    }
    if (id !== undefined) {
      query = `SELECT * FROM ${dbConfig.tables.places} WHERE id = ${id};`;
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
  // console.log('Getting settings');
  const db = await getDBConnection();
  const items: any = {};
  const query = `SELECT * FROM ${dbConfig.tables.settings};`;
  const results = await db.executeSql(query);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      items[result.rows.item(index).key] = result.rows.item(index).value;
    }
  });
  // console.log(items);
  return items;
};

export const deleteLocation = async (id: number) => {
  const db = await getDBConnection();
  const deleteQuery = `DELETE from ${dbConfig.tables.places} where id = ${id}`;
  await db.executeSql(deleteQuery);
};
