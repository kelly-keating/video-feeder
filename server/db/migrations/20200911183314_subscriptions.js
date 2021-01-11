
exports.up = (knex) => {
  return knex.schema.createTable('Subscriptions', table => {
    table.string('id')
    table.integer('group_id').defaultTo(0)
    table.string('title')
    table.string('published')
    table.string('author')
    table.string('uri')
    table.string('last_updated')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Subscriptions')
}
