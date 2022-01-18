process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { getPlayer } = require('../../../src/resolvers/queries')

chai.should();

const { reseedDb } = require('../../../specs');
before(async () => reseedDb());

describe('Resolvers - Queries', () => {
  const params = { teamId: 'test-team-1', playerId: 'Player-456' };
  it('`getPlayer` query should retrieve player', async () => {
    const result = await getPlayer(null, { ...params }).then(data => data);

    result.should.have.property('Id');
    expect(result.Id).to.equal(params.teamId);

    result.should.have.property('Metadata');
    expect(result.Metadata).to.equal(params.playerId);

    result.should.have.property('PlayerName');
    expect(result.PlayerName).to.equal('Test Player3');

    result.should.have.property('Position');
    expect(result.Position).to.equal('LW');
  });
});