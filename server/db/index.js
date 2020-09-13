const knex = require('knex')
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const db = knex(config)


function getGroups() {
  return db('Groups')
}

function addGroup(name) {
  return db('Groups')
    .insert({ name })
}

module.exports = {
  getGroups,
  addGroup,
}