import { BaseSchema } from '@adonisjs/lucid/schema'

import { tokenTypesDbValues } from '#tokens/enums/token_type'

export default class extends BaseSchema {
  protected tableName = 'token_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 50).notNullable().unique()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert(tokenTypesDbValues)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
