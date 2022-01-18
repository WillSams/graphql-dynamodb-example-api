process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');

chai.use(require('chai-http'));
chai.should();

const { reseedDb } = require('../../../../specs');

describe('Route - Queries - /graphql', () => {
  before(async () => reseedDb());
  it('`listTeams` query should retrieve all teams', done => {
    chai.request(bootstrap)
      .post('/graphql')
      .send({
        query: `
        query ListTeams {
          listTeams {
            Id
            Metadata
            TeamName
            Abbreviation
            Arena
          }
        }`,
      })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        expect(data.listTeams.length).to.equal(3);

        done();
      });
  });
});