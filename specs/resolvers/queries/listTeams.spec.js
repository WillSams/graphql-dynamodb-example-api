process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { listTeams } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  it('`listTeams` query should retrieve all teams', async () => {
    const result = await listTeams(null);

    expect(result.length).to.equal(3);
  });
});