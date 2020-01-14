const Router = require('express').Router()

const format = seconds => {
  const days = Math.floor(seconds / (3600*24));
  const hours = Math.floor(seconds / (60*60));
  const minutes = Math.floor(seconds % (60*60) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days} : ${hours} : ${minutes} : ${secs}`
}

Router.get('/', (req, res) => {
  const uptimeSeconds = process.uptime()
  const uptime = format(uptimeSeconds)
  res.status(200).json({ uptime, status: 200 })
})

module.exports = Router