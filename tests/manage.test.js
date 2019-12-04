require('module-alias/register');

const chai = require('chai');
const { saveInquiry, fetchResolvedInquiries, deleteInquiry, fetchTestInquiries } = require('@db');
const { getManageTestInquiry  } = require('@tests/mockData');
const expect = chai.expect;

const testRef = '1234';

describe('GET /api/inquiries/manage test cron to delete 30 day old inquiries', () => {
  const limit = 5;

  before(async () => {
    try {
      for (let i = 0; i < limit; i++) {
        const testInquiry = getManageTestInquiry(i);
        await saveInquiry(testInquiry);
      }
    } catch(err) {
      console.log('Error saving test inquiries before testing', err);
    }
  })

  it ('Get resolved inquiries older than 30 days old and delete them using methods from emitter', async () => {
    let oldInquiries = [];
    try {
      oldInquiries = await fetchResolvedInquiries();
    } catch (err) {
      console.log('error fetching resolved inquiries in test: ', err);
    }
    expect(oldInquiries.length).to.equal(5);

    try {
      for (let index = 0; index < oldInquiries.length; index++) {
        await deleteInquiry(oldInquiries[index]);
      }
    } catch (err) {
      console.log('error deleting old inquiries in testing: ', err);
    }

    let testInquiries = [];
    try {
      testInquiries = await fetchTestInquiries(testRef);
    } catch (err) {
      console.log('error fetching test inquiries while testing: ', err);
    }
    expect(testInquiries.length).to.equal(0);
  });
});
