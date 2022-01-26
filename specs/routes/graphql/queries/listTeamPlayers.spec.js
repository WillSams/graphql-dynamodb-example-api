process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {

  before(() => reseedDb());

  it('`listTeamPlayers` query should retrieve players for a team', done => {
    chai.request(bootstrap)
      .post('/api/graphql')
      .send({
        query: `
        query ListTeamPlayers($teamId: String!) {
          listTeamPlayers(teamId: $teamId) {
            Id
            Metadata
            PlayerName
            Position
          }
        }`,
        variables: { "teamId": "test-team-1" },
      })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        expect(data.listTeamPlayers.length).to.equal(2);

        done();
      });
  });
});