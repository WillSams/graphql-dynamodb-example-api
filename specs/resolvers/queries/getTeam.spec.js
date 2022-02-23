process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { team } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  const params = { teamId: 'test-team-3' };

  it('`team` query should retrieve team', () => {
    team(null, { ...params }).then(result => {

      result.should.have.property('Id');
      expect(result.Id).to.equal(params.teamId);

      result.should.have.property('Metadata');
      expect(result.Metadata).to.equal('Team');

      result.should.have.property('TeamName');
      expect(result.TeamName).to.equal('Test Team 3');

      result.should.have.property('Arena');
      expect(result.Arena).to.equal('Test Team 3 Arena');
    });
  });
});