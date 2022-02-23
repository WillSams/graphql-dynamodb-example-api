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
      .set({ "Authorization": `Bearer ${process.env.TOKEN_SECRET}` })
      .send({ query: '{ team(teamId: "test-team-1") { Id Metadata TeamName Arena } }' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const result = res?.body?.data?.team;

        result.should.have.property('Id');
        expect(result.Id).to.equal('test-team-1');

        result.should.have.property('Metadata');
        expect(result.Metadata).to.equal('Team');

        result.should.have.property('TeamName');
        expect(result.TeamName).to.equal('Test Team 1');

        result.should.have.property('Arena');
        expect(result.Arena).to.equal('Test Team 1 Arena');

        done();
      });
  });
});