// GCP Datastore docs https://googleapis.dev/nodejs/datastore/latest/
const path = require('path');
const { Datastore } = require('@google-cloud/datastore');
const { log } = require('@logging');
const isProduction = require('@utils/isProduction');

const isPrd = isProduction();
const isDev = !isPrd;
// Create a new client
const datastore = new Datastore({
  projectId: process.env.PROJECT_ID,
});
const namespace = 'inquiry';
const kind = isPrd ? 'contact' : 'test';
const logLevel = 'db';
// if the user passes the same email it will update their entry instead of creating a new one
// that is because of the key
module.exports.saveInquiry = body => {
  const { email, ref, resolved, when } = body;
  const taskKey = datastore.key({ namespace: namespace, path: [kind, email] });
  const inquiry = {
    key: taskKey,
    data: { ...body, resolved: resolved || false, when: when || Date.now() },
  }
  return new Promise(async (resolve, reject) => {
    try {
      const message = `saved ${ref}`;
      await datastore.save(inquiry);
      log(logLevel, message);
      return resolve(inquiry);
    } catch (err) {
      log(logLevel, `Err: ${err}`);
      return reject(e);
    }
  });
}

module.exports.fetchByRef = ref => {
  const query = datastore
    .createQuery(namespace, kind)
    .filter('ref', ref);
  
  return new Promise(async (resolve, reject) => {
    try {
      const results = await datastore.runQuery(query);
      const singleResult = results[0].reduce((acc, entry) => entry, {});
      return resolve(singleResult);
    } catch(err) {
      log(logLevel, `Err: ${err}`);
      return reject(err);
    }
  })
}

module.exports.fetchResolvedInquiries = () => {
  const now = Date.now();
  const query = datastore
    .createQuery(namespace, kind)
    .filter('resolved', true);
  
  return new Promise(async (resolve, reject) => {
    try {
      const resolvedInquries = await datastore.runQuery(query);
      const staleInquiries = resolvedInquries[0].reduce((acc, inquiry) => {
        const { when } = inquiry;
        const timeDiff = new Date(now) - new Date(when);
        const diffInDays = Math.floor(timeDiff/1000/60/60/24);
        // if when is 30 days or more ago
        if (diffInDays > 30) {
          acc.push(inquiry);
        }
        return acc;
      }, []);
      return resolve(staleInquiries);
    } catch(err) {
      log(logLevel, `Err: ${err}`);
      return reject(err);
    }
  })
}

module.exports.deleteInquiry = inquiry => {
  const { email, ref } = inquiry;
  const message = `deleted ${ref}`;
  const taskKey = datastore.key({ namespace: namespace, path: [kind, email] });
 return new Promise(async (resolve, reject) => {
  try {
    await datastore.delete(taskKey);
    log(logLevel, message);
    resolve()
  } catch (err) {
    log(logLevel, `Err: ${err}`);
    reject(err);
  }
 })
}

module.exports.fetchTestInquiries = testRef => {
  const query = datastore
    .createQuery(namespace, 'test')
    .filter('ref', testRef);
  
  return new Promise(async (resolve, reject) => {
    try {
      const results = await datastore.runQuery(query);
      return resolve(results[0]);
    } catch(err) {
      log(logLevel, `Err: ${err}`);
      return reject(err);
    }
  })
}
