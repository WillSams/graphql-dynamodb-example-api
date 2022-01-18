process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { listTeamPlayers } = require('../../../src/resolvers/queries');

chai.should();

const { reseedDb } = require('../../../specs');
before(async () => reseedDb());

describe('Resolvers - Queries', () => {
  const params = { teamId: 'test-team-1' };
  it('`listTeamPlayers` query should retrieve players for given team', async () => {
    const result = await listTeamPlayers(null, { ...params });

    expect(result.length).to.equal(2);
  });
});