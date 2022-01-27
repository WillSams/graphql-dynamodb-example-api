process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {
  before(() => reseedDb());

  it('`team` query should retrieve team', done => {
    chai.request(bootstrap)
      .post('/api/graphql')
      .send({ query: '{ team(teamId: "test-team-1") { Id Metadata TeamName Arena } }' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const data = res?.body?.data;

        data.team.should.have.property('Id');
        expect(data.team.Id).to.equal('test-team-1');

        data.team.should.have.property('Metadata');
        expect(data.team.Metadata).to.equal('Team');

        data.team.should.have.property('TeamName');
        expect(data.team.TeamName).to.equal('Test Team 1');

        data.team.should.have.property('Arena');
        expect(data.team.Arena).to.equal('Test Team 1 Arena');

        done();
      });
  });
});