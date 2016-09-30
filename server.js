const Hapi = require('hapi')
const inert = require('inert')
const horizon = require('@horizon/server')

const server = new Hapi.Server
server.register(inert)
server.connection({ port: 8181 })

const httpServers = server.connections.map(c => c.listener)
horizon(httpServers, {
  project_name: 'test',
  auth: {
    token_secret: 'ahqhrbqrq3498130y459h83rg1h3rg',
    success_redirect: '/',
    allow_anonymous: true,
    allow_unauthenticated: true,
  },
  permissions: false,
  auto_create_collection: true,
  auto_create_index: true,
})

server.route({
  method: 'GET',
  path: '/{any*}',
  handler: (req, rep) => rep.file(`${__dirname}/index.html`)
})

server.start(err => err && console.error(err))
