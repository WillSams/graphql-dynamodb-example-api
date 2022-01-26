process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { listTeamPlayers } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  const params = { teamId: 'test-team-1' };

  it('`listTeamPlayers` query should retrieve players for given team', async () => {
    const result = await listTeamPlayers(null, { ...params });

    expect(result.length).to.equal(2);
  });
});