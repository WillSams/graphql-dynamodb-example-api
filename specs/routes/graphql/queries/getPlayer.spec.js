process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {
  before(() => reseedDb());

  it('`getPlayer` query should retrieve player', done => {
    const variables = { teamId: 'test-team-1', playerId: 'Player-123' };
    chai.request(bootstrap)
      .post('/api/graphql')
      .send({
        query: `query GetPlayer($teamId: String!, $playerId: String!) {
            getPlayer(teamId: $teamId, playerId: $playerId) {
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

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        data.getPlayer.should.have.property('Id');
        expect(data.getPlayer.Id).to.equal(variables.teamId);

        data.getPlayer.should.have.property('Metadata');
        expect(data.getPlayer.Metadata).to.equal(variables.playerId);

        data.getPlayer.should.have.property('PlayerName');
        expect(data.getPlayer.PlayerName).to.equal('Test Player1');

        data.getPlayer.should.have.property('Position');
        expect(data.getPlayer.Position).to.equal('G');

        done();
      });
  });
});