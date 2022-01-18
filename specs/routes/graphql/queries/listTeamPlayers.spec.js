process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');

chai.use(require('chai-http'));
chai.should();

const { reseedDb } = require('../../../../specs');
before(async () => reseedDb());

describe('Route - Queries - /graphql', () => {
  it('`listTeamPlayers` query should retrieve players for a team', done => {
    chai.request(bootstrap)
      .post('/graphql')
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