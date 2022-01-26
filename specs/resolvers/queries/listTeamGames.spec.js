process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { listTeamGames } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  const params = { teamId: 'test-team-1' };

  it('`listTeamGames` query should retrieve games for given team', async () => {
    const result = await listTeamGames(null, { ...params });
    expect(result).to.to.have.lengthOf(2);
  });
});