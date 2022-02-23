process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {
  before(() => reseedDb());;

  const variables = { teamId: 'test-team-1', gameId: 'Game-4' };

  it('`game` query should retrieve game', done => {
    chai.request(bootstrap)
      .post('/api/graphql')
      .set({ "Authorization": `Bearer ${process.env.TOKEN_SECRET}` })
      .send({
        query: `query GetGame($teamId: String!, $gameId: String!) {
          game(teamId: $teamId, gameId: $gameId) {
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

        res.headers['content-type'].should.contains('application/json');

        const result = res?.body?.data?.game;

        result.should.have.property('Id');
        expect(result.Id).to.equal(variables.teamId);

        result.should.have.property('Metadata');
        expect(result.Metadata).to.equal(variables.gameId);

        result.should.have.property('GameDay');
        expect(result.GameDay).to.equal('Jan-17-2022');

        result.should.have.property('WinLoss');
        expect(result.WinLoss).to.equal('Loss');

        done();
      });
  });
});