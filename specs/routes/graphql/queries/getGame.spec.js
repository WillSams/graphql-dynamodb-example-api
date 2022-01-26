process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {
  before(() => reseedDb());

  const variables = { teamId: 'test-team-1', gameId: 'Game-4' };

  it('`getGame` query should retrieve game', done => {
    chai.request(bootstrap)
      .post('/api/graphql')
      .send({
        query: `query GetGame($teamId: String!, $gameId: String!) {
          getGame(teamId: $teamId, gameId: $gameId) {
            Id
            Metadata
            GameDay
            WinLoss
          }
        }`,
        variables: variables,
      })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        data.getGame.should.have.property('Id');
        expect(data.getGame.Id).to.equal(variables.teamId);

        data.getGame.should.have.property('Metadata');
        expect(data.getGame.Metadata).to.equal(variables.gameId);

        data.getGame.should.have.property('GameDay');
        expect(data.getGame.GameDay).to.equal('Jan-17-2022');

        data.getGame.should.have.property('WinLoss');
        expect(data.getGame.WinLoss).to.equal('Loss');

        done();
      });
  });
});