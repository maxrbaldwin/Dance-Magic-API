const Router = require('express').Router()

const format = seconds => {
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${hours} : ${minutes} : ${seconds}`
}

Router.get('/', (req, res) => {
  const uptimeSeconds = process.uptime
  const uptime = format(uptimeSeconds)
  res.status(200).json({ uptime, status: 200 })
})

module.exports = Router