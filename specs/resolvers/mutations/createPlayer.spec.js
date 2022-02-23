process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { createPlayer } = require('../../../src/resolvers/mutations');

chai.should();

describe('Resolvers - Mutation', () => {

  const params = {
    teamId: 'test-team-4',
    playerId: 'Player-abc',
    playerName: 'Jane Doe',
    position: 'S'
  };

  it('`createPlayer` mutation should create player', () => {
    createPlayer(null, { input: { ...params } })
      .then(result => {

        result.should.have.property('Id');
        expect(result.Id).to.equal(params.teamId);

        result.should.have.property('Metadata');
        expect(result.Metadata).to.equal(params.playerId);

        result.should.have.property('PlayerName');
        expect(result.PlayerName).to.equal(params.playerName);

        result.should.have.property('Position');
        expect(result.Position).to.equal(params.position);
      });
  });
});