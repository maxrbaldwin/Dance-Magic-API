const Router = require('express').Router()

const getUptime = () => {
  const seconds = process.uptime()
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60)
  const secs = Math.floor(((seconds % 86400) % 3600) % 60)

  return `${days} : ${hours} : ${minutes} : ${secs}`
}

const getHealth = () => ({
  status: 200,
  uptime:  getUptime(),
  build: process.env.BUILD_ID || 'N/A',
  hash: process.env.COMMIT_SHA || 'N/A',
})

Router.get('/', (req, res) => {
  const health = getHealth()
  res.status(200).json(health)
})

module.exports = Router
