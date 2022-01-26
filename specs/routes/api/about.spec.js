process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../src/bootstrap');

chai.use(require('chai-http'));
chai.should();

describe('Route - About - /api', () => {
    it('`/api/about` should present details', done => {
        chai.request(bootstrap)
            .get('/api/about')
            .end((err, res) => {
                if (err || res.error) return done(err);

                expect(res.status).to.equal(200);

                res.headers['content-type'].should.contains('application/json');

                res.body.should.have.property('name');
                res.body.should.have.property('version');
                res.body.should.have.property('description');

                done();
            });
    });
});