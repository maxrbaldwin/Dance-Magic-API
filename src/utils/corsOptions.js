const whitelist = [
  'https://dance-magic-259922.appspot.com',
  'https://dancemagicnj.com',
  'https://www.dancemagicnj.com',
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
  credentials: true
}