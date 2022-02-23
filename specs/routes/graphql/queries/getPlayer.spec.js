process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {
  before(() => reseedDb());;

  it('`player` query should retrieve player', done => {
    const variables = { teamId: 'test-team-1', playerId: 'Player-123' };
    chai.request(bootstrap)
      .post('/api/graphql')
      .set({ "Authorization": `Bearer ${process.env.TOKEN_SECRET}` })
      .send({
        query: `query GetPlayer($teamId: String!, $playerId: String!) {
            player(teamId: $teamId, playerId: $playerId) {
              Id
              Metadata
              PlayerName
              Position
            }
          }`,
        variables: variables,
      })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        res.headers['content-type'].should.contains('application/json');

        const result = res?.body?.data?.player;

        result.should.have.property('Id');
        expect(result.Id).to.equal(variables.teamId);

        result.should.have.property('Metadata');
        expect(result.Metadata).to.equal(variables.playerId);

        result.should.have.property('PlayerName');
        expect(result.PlayerName).to.equal('Test Player1');

        result.should.have.property('Position');
        expect(result.Position).to.equal('G');

        done();
      });
  });
});