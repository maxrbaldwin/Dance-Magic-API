require('module-alias/register');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@server');
const { encryptObject } = require('dance-magic/packages/encryption')
const { saveInquiry, deleteInquiry } = require('@db');
const { testInquiry } = require('@tests/mockData');

chai.use(chaiHttp);

describe('GET /api/inquiries/resolve with invalid params', () => {
  it('No ref in request. expect 400', done => {
    chai.request(server)
    .get('/api/inquiries/resolve')
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  });

  it('Invalid query param. expect 400', done => {
    chai.request(server)
    .get('/api/inquiries/resolve?id=1234')
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  });

  it('Invalid ref param. expect 400', done => {
    chai.request(server)
    .get('/api/inquiries/resolve?ref=6789')
    .end((err, res) => {
      res.should.have.status(400);
      done();
    })
  });
});

describe('GET /api/inquiries/resolve with valid params', () => {
  before(async () => {
    const keyring = 'db'
    const key = 'users'
    const { email, name, phone, message, ref, token } = testInquiry;
    const toEncrypt = { email, name, phone, message }
    const inquiry = await encryptObject(toEncrypt, keyring, key)
    await saveInquiry({ ref, token, ...inquiry });
  })
  
  it('resolves a valid inquiry expect 200 and valid text', done => {
    chai.request(server)
    .get(`/api/inquiries/resolve?ref=${testInquiry.ref}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.text.should.equal(`The inquiry with ${testInquiry.name} at ${testInquiry.email} has been resolved. This contact will be saved for 30 days and then deleted`);
      done();
    })
  });

  it('an already resolved inquiry should return 200 and have valid text', done => {
    chai.request(server)
    .get(`/api/inquiries/resolve?ref=${testInquiry.ref}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.text.should.equal('already resolved');
      done();
    })
  });

  after(async () => {
    try {
      await deleteInquiry(testInquiry);
    } catch (err) {
      console.log('delete err: ', err);
    }
  })
})
