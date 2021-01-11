exports.seed = (knex) => knex('Groups').del()
  .then(function () {
    return knex('Groups').insert([
      { id: 0, name: 'default (None)' }
    ])
  })
