
exports.up = (knex) => {
  return knex.schema.createTable('Videos', table => {
    table.string('id')
    table.string('sub_id')
    table.string('title')
    table.string('published')
    table.string('updated')
    table.string('link')
    table.string('thumbnail')
    table.text('description')
    table.text('content')
    table.integer('views')
    table.string('rating')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Videos')
}
