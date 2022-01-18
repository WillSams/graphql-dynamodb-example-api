process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { createGame } = require('../../../src/resolvers/mutations')
const { reseedDb, removeDbTestData } = require('../../../specs');

chai.should();

before(async () => await reseedDb());
after(async () => await removeDbTestData());

describe('Resolvers - Mutation', () => {

  const params = {
    teamId: 'test-team-4',
    gameId: 'Game-123',
    gameDay: 'Oct-24-2022',
    winLoss: 'Loss'
  };

  it('`createGame` mutation should create game', async () => {
    const result = await createGame(null, { input: { ...params } }).then(data => data);

    result.should.have.property('Id');
    expect(result.Id).to.equal(params.teamId);

    result.should.have.property('Metadata');
    expect(result.Metadata).to.equal(params.gameId);

    result.should.have.property('GameDay');
    expect(result.GameDay).to.equal(params.gameDay);

    result.should.have.property('WinLoss');
    expect(result.WinLoss).to.equal(params.winLoss);
  });
});