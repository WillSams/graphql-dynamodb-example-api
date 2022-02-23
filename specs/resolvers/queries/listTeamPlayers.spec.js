process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { teamPlayers } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  const params = { teamId: 'test-team-1' };

  it('`teamPlayers` query should retrieve players for given team', () => {
    teamPlayers(null, { ...params }).then(result => {
      expect(result.length).to.equal(2);
    });
  });
});