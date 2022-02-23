process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { teams } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  it('`teams` query should retrieve all teams', () => {
    teams(null).then(result => {
      expect(result.length).to.equal(3);
    });
  });
});