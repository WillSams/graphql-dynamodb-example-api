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

        const data = res?.body?.data;

        data.player.should.have.property('Id');
        expect(data.player.Id).to.equal(variables.teamId);

        data.player.should.have.property('Metadata');
        expect(data.player.Metadata).to.equal(variables.playerId);

        data.player.should.have.property('PlayerName');
        expect(data.player.PlayerName).to.equal('Test Player1');

        data.player.should.have.property('Position');
        expect(data.player.Position).to.equal('G');

        done();
      });
  });
});