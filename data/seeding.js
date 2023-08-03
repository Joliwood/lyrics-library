/**
 * Ce fichier à pour but d'insérer en BDD des données de restaurants, d'utilisateurs, de villes et
 * de style de cuisine de restaurants.
 *
 * L'exécution de ce script est présente dans le script resetDB
 */

import '../app/helpers/env.loader.js';
import { faker } from '@faker-js/faker';
import debugModule from 'debug';

import db from '../app/db/pg.js';

const debug = debugModule('seeding');

db.queryCount = 0;

faker.locale = 'fr';
const NB_MANAGERS = 50;
const NB_RESTAURANTS = 100;
const NB_TYPES = 20;
const NB_CITIES = 200;

function pgQuoteEscape(row) {
  const newRow = {};
  Object.entries(row).forEach(([prop, value]) => {
    if (typeof value !== 'string') {
      newRow[prop] = value;
      return;
    }
    newRow[prop] = value.replaceAll("'", "''");
  });
  return newRow;
}

function generateManagers(nbManagers) {
  const managers = [];
  for (let iManager = 0; iManager < nbManagers; iManager += 1) {
    const manager = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    managers.push(manager);
  }
  return managers;
}

async function insertManagers(managers) {
  await db.query('TRUNCATE TABLE "manager" RESTART IDENTITY CASCADE');
  const managerValues = managers.map((manager) => `(
                 '${manager.firstname}',
                 '${manager.lastname}',
                 '${manager.email}',
                 '${manager.password}'
             )`);

  const queryStr = `
             INSERT INTO "manager"
             (
                 "firstname",
                 "lastname",
                 "email",
                 "password"
             )
             VALUES
             (
                 'Yann',
                 'Guilloux',
                 'yann@oclock.io',
                 '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
             ),-- superpass
             (
                 'Nicolas',
                 'Charpin',
                 'nicolas.charpin@oclock.io',
                 '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
             ), -- superpass
             (
                 'Benjamin',
                 'Nougadère',
                 'benjamin.nougadere@oclock.io',
                 '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
             ), -- superpass
             ${managerValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

function generateCookingStyles(nbCookingStyles) {
  const cookingStyles = [];
  for (let i = 0; i < nbCookingStyles; i += 1) {
    const cookingStyle = {
      label: faker.address.country(),
    };
    cookingStyles.push(cookingStyle);
  }
  return cookingStyles;
}

async function insertCookingStyles(cookingStyles) {
  await db.query('TRUNCATE TABLE "cooking_style" RESTART IDENTITY CASCADE');
  const cookingStylesValues = cookingStyles.map((cookingStyle) => {
    const newCookingStyle = pgQuoteEscape(cookingStyle);
    return `(
            '${newCookingStyle.label}'
        )`;
  });

  const queryStr = `
             INSERT INTO "cooking_style"
             (
                 "label"
             )
             VALUES
             ${cookingStylesValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

function generateCities(nbCities) {
  const cities = [];
  for (let i = 0; i < nbCities; i += 1) {
    let name = faker.address.city();
    // eslint-disable-next-line no-loop-func
    while (cities.find((city) => city.name === name)) {
      name = faker.address.city();
    }

    let postalCode = faker.address.zipCode();
    // eslint-disable-next-line no-loop-func
    while (cities.find((city) => city.postal_code === postalCode)) {
      postalCode = faker.address.zipCode();
    }
    const city = {
      name,
      postal_code: postalCode,
      geopos: faker.address.nearbyGPSCoordinate(),
    };
    cities.push(city);
  }
  return cities;
}

async function insertCities(cities) {
  await db.query('TRUNCATE TABLE "city" RESTART IDENTITY CASCADE');
  const citiesValues = cities.map((city) => {
    const newCity = pgQuoteEscape(city);
    return `(
            '${newCity.name}',
            '${newCity.postal_code}',
            '${newCity.geopos}'
        )`;
  });
  const queryStr = `
             INSERT INTO "city"
             (
                 "name",
                 "postal_code",
                 "geopos"
             )
             VALUES
             ${citiesValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

async function generateRestaurant(nbResto, managerIds, cityIds) {
  const restaurants = [];
  for (let i = 0; i < nbResto; i += 1) {
    let name = `${faker.name.firstName()} ${faker.name.suffix()}`;
    // eslint-disable-next-line no-loop-func
    while (restaurants.find((restaurant) => restaurant.name === name)) {
      name = `${faker.name.firstName()} ${faker.name.suffix()}`;
    }
    const restaurant = {
      name,
      description: faker.company.catchPhrase(),
      terrace: faker.datatype.boolean(),
      manager_id: managerIds[faker.datatype.number({ min: 0, max: managerIds.length - 1 })],
      city_id: cityIds[faker.datatype.number({ min: 0, max: cityIds.length - 1 })],
    };
    restaurants.push(restaurant);
  }
  return restaurants;
}

async function insertRestaurant(restaurants) {
  await db.query('TRUNCATE TABLE "restaurant" RESTART IDENTITY CASCADE');
  const restaurantValues = restaurants.map((restaurant) => {
    const newRestaurant = pgQuoteEscape(restaurant);
    return `(
                 'Chez ${newRestaurant.name}',
                 '${newRestaurant.description}',
                 ${newRestaurant.terrace},
                 ${newRestaurant.manager_id},
                 ${newRestaurant.city_id}
             )`;
  });

  const queryStr = `
             INSERT INTO "restaurant"
             (
                 "name",
                 "description",
                 "terrace",
                 "manager_id",
                 "city_id"
             )
             VALUES
             ${restaurantValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

function generateRestaurantHasCS(restaurantIds, cookingStyleIds) {
  const restaurantHasCookingStyles = restaurantIds.map((restaurantId) => {
    const cookingStyleIdsFree = [...cookingStyleIds];
    const nbRestaurantCookingStyle = Math.min(
      faker.datatype.number(10),
      Math.ceil(cookingStyleIds.length / 3),
    ) + 1;
    const cookingStyles = [];
    for (let i = 0; i < nbRestaurantCookingStyle; i += 1) {
      const randomCookingStyleIndex = faker.datatype.number(cookingStyleIdsFree.length - 1);
      const cookingStyleId = cookingStyleIdsFree.splice(randomCookingStyleIndex, 1)[0];

      cookingStyles.push({
        cookingStyleId,
        restaurantId,
      });
    }
    return cookingStyles;
  }).flat();
  return restaurantHasCookingStyles;
}

async function insertRestaurantHasCS(restaurantHasCookingStyles) {
  await db.query('TRUNCATE TABLE "restaurant_has_cooking_style" RESTART IDENTITY CASCADE');
  const restaurantHasCookingStyleValues = restaurantHasCookingStyles.map((restaurantHasCookingStyle) => (`(
             ${restaurantHasCookingStyle.cookingStyleId},
             ${restaurantHasCookingStyle.restaurantId}
         )`));

  const queryStr = `
         INSERT INTO "restaurant_has_cooking_style"
         (
            "cooking_style_id",
            "restaurant_id"
         )
         VALUES
         ${restaurantHasCookingStyleValues}
         RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

(async () => {
  /**
      * Générations d'utilisateurs fake
      * Ajout de ces utilisateurs en BDD
      */
  const managers = generateManagers(NB_MANAGERS);
  const insertedManagers = await insertManagers(managers);
  debug(`${insertedManagers.length} managers inserted`);
  const managerIds = insertedManagers.map((manager) => manager.id);

  /**
     * Génération des style de cuisine fake
     * Ajout de ces style de cuisine en BDD
     */
  const cookingStyles = generateCookingStyles(NB_TYPES);
  const insertedCookingStyles = await insertCookingStyles(cookingStyles);
  debug(`${insertedCookingStyles.length} cookingStyles inserted`);
  const cookingStyleIds = insertedCookingStyles.map((cookingStyle) => cookingStyle.id);

  /**
     * Génération des villes fake
     * Ajout de ces villes en BDD
     */
  const cities = generateCities(NB_CITIES);
  const insertedCities = await insertCities(cities);
  debug(`${insertedCities.length} cities inserted`);
  const cityIds = insertedCities.map((city) => city.id);

  /**
      * Génération des restaurants fake
      * Ajout de ces restaurants dans la BDD
      */
  const restaurants = await generateRestaurant(NB_RESTAURANTS, managerIds, cityIds);
  const insertedRestaurants = await insertRestaurant(restaurants);
  debug(`${insertedRestaurants.length} movies inserted`);
  const restaurantIds = insertedRestaurants.map((restaurant) => restaurant.id);

  /**
      * Association des restaurants et des styles de cuisine
      * Ajout de ces associations en BDD
      */
  const restaurantHasCookingStyles = generateRestaurantHasCS(restaurantIds, cookingStyleIds);
  const insertedRestaurantHasCSs = await insertRestaurantHasCS(restaurantHasCookingStyles);
  debug(`${insertedRestaurantHasCSs.length} restaurant <> cooking style association inserted`);
  db.originalClient.end();
})();
