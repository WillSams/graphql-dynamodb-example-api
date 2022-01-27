process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { game } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  const params = { teamId: 'test-team-3', gameId: 'Game-3' };

  it('`game` query should retrieve game', async () => {
    const result = await game(null, { ...params }).then(data => data);

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