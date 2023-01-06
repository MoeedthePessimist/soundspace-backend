/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
require("tsconfig-paths/register");

import dotenv from "dotenv";
import { isProductionEnvironment, isTestingEnvironment } from "@/utils/Utilities";

if (!isProductionEnvironment()) {
  dotenv.config({ path: isTestingEnvironment() ? "../testing.env" : "../.env" });
}



module.exports = {
  client: "postgresql",
  connection: process.env.DATABASE_CONNECTION_STRING,
  migrations: {
    extension: "ts",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

// export default config;
