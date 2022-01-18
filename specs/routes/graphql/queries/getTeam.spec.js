process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');

chai.use(require('chai-http'));
chai.should();

const { reseedDb } = require('../../../../specs');
before(async () => reseedDb());

describe('Route - Queries - /graphql', () => {
  it('`getTeam` query should retrieve team', done => {
    chai.request(bootstrap)
      .post('/graphql')
      .send({ query: '{ getTeam(teamId: "test-team-1") { Id Metadata TeamName Abbreviation Arena } }' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const data = res?.body?.data;

        data.getTeam.should.have.property('Id');
        expect(data.getTeam.Id).to.equal('test-team-1');

        data.getTeam.should.have.property('Metadata');
        expect(data.getTeam.Metadata).to.equal('Team');

        data.getTeam.should.have.property('TeamName');
        expect(data.getTeam.TeamName).to.equal('Test Team 1');

        data.getTeam.should.have.property('Abbreviation');
        expect(data.getTeam.Abbreviation).to.equal('TT01');

        data.getTeam.should.have.property('Arena');
        expect(data.getTeam.Arena).to.equal('Test Team 1 Arena');

        done();
      });
  });
});