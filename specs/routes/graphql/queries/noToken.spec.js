process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');

chai.use(require('chai-http'));

describe('Route - Queries - /api/graphql', () => {
  it('should not allow Graphql queries without authorization', done => {
    chai.request(bootstrap)
      .post('/api/graphql')
      .set({ "Authorization": '' })
      .send({ query: '{ team(teamId: "test-team-1") { Id Metadata TeamName Arena } }' })
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(500);

        const error = res?.body?.errors[0];
        expect(error).to.equal('Context creation failed: You are not authorized to make requests to this API\'s GraphQL endpoints');

        done();
      });
  });
});