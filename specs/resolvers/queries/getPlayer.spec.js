process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { player } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  const params = { teamId: 'test-team-1', playerId: 'Player-456' };

  it('`player` query should retrieve player', () => {
    player(null, { ...params }).then(result => {

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
});