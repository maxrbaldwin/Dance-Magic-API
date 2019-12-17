require('module-alias/register');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@server');
const should = chai.should();

const {
  validData,
  emptyData,
} = require('@tests/mockData');

chai.use(chaiHttp);

describe('GET /', () => {
  it('it should return 200', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  })
});

describe('POST /', () => {
  it('it should return 404', done => {
    chai.request(server)
      .post('/')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      })
  })
});

describe('POST /api/contact', () => {
  it('without data, should return 400', done => {
    chai.request(server)
      .post('/api/contact')
      .send(emptyData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
});

describe('POST /api/contact', () => {
  it('with valid data, should return 200', done => {
    const data = validData();

    chai.request(server)
      .post('/api/contact')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });
})
