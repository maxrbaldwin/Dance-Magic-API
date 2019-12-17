require('module-alias/register');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('@server');

const {
  validData,
  withNumbersInName,
  withSpecialCharactersInName,
  withInvalidEmail,
  phoneWithLetters,
  phoneWithSpecialCharacters,
  withAlternativePhoneFormat,
} = require('@tests/mockData');

chai.use(chaiHttp);

describe('POST /api/contact with invalid names', () => {
  it('Valid data with no name, it should return 400', done => {
    const localData = validData();
    delete localData['name'];

    chai.request(server)
      .post('/api/contact')
      .send(localData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Numbers  in name, it should return 400', done => {
    chai.request(server)
      .post('/api/contact')
      .send(withNumbersInName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })

  it('Special characters in name, it should return 400', done => {
    chai.request(server)
      .post('/api/contact')
      .send(withSpecialCharactersInName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
});

describe('POST /api/contact with invalid email', () => {
  it('Valid data with no email, it should return 400', done => {
    const localData = validData();
    delete localData['email'];

    chai.request(server)
      .post('/api/contact')
      .send(localData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });

  });

  it('With an invalid email, it should return 400', done => {
    chai.request(server)
      .post('/api/contact')
      .send(withInvalidEmail)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
});

describe('POST /api/contact with invalid message', () => {
  it('With no message, should return 400', done => {
    const localData = validData();
    delete localData['message'];

    chai.request(server)
      .post('/api/contact')
      .send(localData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('POST /api/contact with invalid and valid phone', () => {
  it('With no phone, should return 200', done => {
    const localData = validData();
    delete localData['phone'];

    chai.request(server)
      .post('/api/contact')
      .send(localData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('With alternative phone format, it should return 200', done => {
    chai.request(server)
      .post('/api/contact')
      .send(withAlternativePhoneFormat)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('With phone that has letters, should return 400', done => {
    chai.request(server)
      .post('/api/contact')
      .send(phoneWithLetters)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('With phone that has special characters, should return 400', done => {
    chai.request(server)
      .post('/api/contact')
      .send(phoneWithSpecialCharacters)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
})
