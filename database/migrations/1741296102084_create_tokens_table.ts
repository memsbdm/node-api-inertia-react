import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token', 64).notNullable()
      table.timestamp('expires_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('token_types')
        .onDelete('CASCADE')
      table.uuid('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
