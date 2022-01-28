process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb, } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();

describe('Route - Queries - /api/graphql', () => {
  before(() => reseedDb());

  it('`teams` query should retrieve all teams', done => {
    chai.request(bootstrap)
      .post('/api/graphql')
      .set({ "Authorization": `Bearer ${process.env.TOKEN_SECRET}` })
      .send({
        query: `
        query ListTeams {
          teams {
            Id
            Metadata
            TeamName
            Arena
          }
        }`,
      })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        res.headers['content-type'].should.contains('application/json');

        const data = res?.body?.data;

        expect(data.teams.length).to.equal(3);

        done();
      });
  });
});