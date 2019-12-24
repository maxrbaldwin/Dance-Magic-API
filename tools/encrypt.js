const path = require('path');
const kms = require('@google-cloud/kms');

const location = 'us-east1'
const PROJECT_ID = 'dance-magic-259922'
const encoding = 'base64';

const client = new kms.v1.KeyManagementServiceClient({
  keyFilename: path.join(__dirname, './../creds/dmc.json'),
  projectId: PROJECT_ID,
})

const encrypt = (data, keyring, key) => {
  return new Promise(async (resolve, reject) => {
    const name = client.cryptoKeyPathPath(PROJECT_ID, location, keyring, key)
    const plaintext = Buffer.from(data)
    const request = {
      name,
      plaintext,
    }

    try {
      const response = await client.encrypt(request)
      const data = response[0].ciphertext.toString(encoding)
      return resolve(data)
    } catch(err) {
      console.log('error encrypting: ', err);
      return reject(err)
    }
  })
}

const decrypt = (encryptedData, keyring, key) => {
  return new Promise(async (resolve, reject) => {
    const name = client.cryptoKeyPathPath(PROJECT_ID, location, keyring, key)
    const ciphertext = Buffer.from(encryptedData, encoding)
    const request = {
      name,
      ciphertext,
    }
  
    try {
      const response = await client.decrypt(request)
      return resolve(response[0])
    } catch(err) {
      console.log('error encrypting: ', err);
      return reject(err)
    }
  })
}

module.exports = {
  encrypt,
  decrypt,
}