process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

chai.should();

const { getGame } = require('../../../src/resolvers/queries');

const { reseedDb } = require('../../../specs');
before(async () => reseedDb());

describe('Resolvers - Queries', () => {
  const params = { teamId: 'test-team-3', gameId: 'Game-3' };
  it('`getGame` query should retrieve game', async () => {
    const result = await getGame(null, { ...params }).then(data => data);

    result.should.have.property('Id');
    expect(result.Id).to.equal('test-team-3');

    result.should.have.property('Metadata');
    expect(result.Metadata).to.equal('Game-3');

    result.should.have.property('GameDay');
    expect(result.GameDay).to.equal('Jan-17-2022');

    result.should.have.property('WinLoss');
    expect(result.WinLoss).to.equal('Win');
  });
});