const whitelist = [
  'https://dance-magic.herokuapp.com',
  'https://dancemagicnj.com',
  'https://www.dancemagicnj.com',
  'http://localhost:8000',
];

module.exports = {
  origin: (origin, callback) => {
    const isSameOrigin = origin === undefined;
    const isWhitelisted = whitelist.indexOf(origin) !== -1
    if (isSameOrigin || isWhitelisted) {
      callback(null, true)
    } else {
      callback(new Error('Cors: Not on whitelist'))
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
}