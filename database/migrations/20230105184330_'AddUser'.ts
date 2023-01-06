import { Knex } from "knex";

import { UserTable } from "@/utils/Constants";

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(UserTable);

  if (!hasTable) {
    await knex.schema.createTable(UserTable, (table) => {
      table.increments();

      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.date("date_of_birth").notNullable();
      table.string("phone").notNullable();
      table.string("contact").notNullable();
      table.string("pro_name").notNullable();
      table.text("additional_members", "text[]").notNullable();
      table.string("recommend").notNullable();
      table.string("tour").notNullable();

      table.timestamp("created_at", { useTz: false }).defaultTo(knex.fn.now());
      table.timestamp("updated_at", { useTz: false }).defaultTo(knex.fn.now());
    });

  //   await knex.schema.raw(`CREATE OR REPLACE FUNCTION trigger_set_updated_at()
  // RETURNS TRIGGER AS $$
  // BEGIN
  //   NEW.updated_at = NOW();
  //   RETURN NEW;
  // END;
  // $$ LANGUAGE plpgsql;`);

  //   await knex.schema.raw(`CREATE TRIGGER ${UserTable}_set_updated_at
  // BEFORE UPDATE ON ${UserTable}
  // FOR EACH ROW
  // EXECUTE FUNCTION trigger_set_updated_at();`);
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(UserTable);

  // await knex.schema.raw("DROP FUNCTION IF EXISTS trigger_set_updated_at();");
}
