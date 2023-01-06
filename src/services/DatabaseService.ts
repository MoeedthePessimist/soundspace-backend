/* eslint-disable import/prefer-default-export */
import knex, { Knex } from 'knex';

import { isTestingEnvironment } from '@/utils/Utilities';

import knexConfig from '../../database/knexfile';
/** The singleton instance of Knex */
let knexInstance: Knex;

/** Returns the Knex singleton */
export const knexConnection = (): Knex => {
  // This ensures that the Knex instance will be created when first called
  // and will ever only be one instance
  // console.log(knexConfig);
  // console.log(process.env.DATABASE_CONNECTION_STRING);
  if (!knexInstance) {
    // knexInstance = knex({
    //   client: "postgresql",
    //   connection: process.env.DATABASE_CONNECTION_STRING,
    //   useNullAsDefault: true,
    //   searchPath: isTestingEnvironment() ? "testing_site" : "public",
    // });
    knexInstance = knex({
      ...knexConfig,
      connection: process.env.DATABASE_CONNECTION_STRING,
      useNullAsDefault: true,
      searchPath: isTestingEnvironment() ? 'testing_site' : 'public',
    });
  }

  return knexInstance;
};
