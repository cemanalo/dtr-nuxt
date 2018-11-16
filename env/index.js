const env = process.env.NODE_ENV
console.log(`Loading config: ${env}`)

let config = {
  BASE_API_URL: 'http://localhost:3000/api',
  LOGIN_URL: 'http://localhost:3000/auth/login'
}

if (env) {
  config = require(`./${env}`)
}

module.exports = config
