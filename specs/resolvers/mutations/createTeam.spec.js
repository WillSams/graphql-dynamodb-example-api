process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { createTeam } = require('../../../src/resolvers/mutations')

const { reseedDb, removeDbTestData } = require('../../../specs');
before(async () => await reseedDb());
after(async () => await removeDbTestData());

chai.should();

describe('Resolvers - Mutation', () => {

  const params = {
    teamId: 'test-team-4',
    teamName: 'Savannah GA JUCO',
    abbreviation: 'SAVJ',
    arena: 'Savannah Civic Center'
  };

  it('`createTeam` mutation should create team', async () => {
    const result = await createTeam(null, { input: { ...params } }).then(data => data);

    result.should.have.property('Id');
    expect(result.Id).to.equal(params.teamId);

    result.should.have.property('Metadata');
    expect(result.Metadata).to.equal('Team');

    result.should.have.property('TeamName');
    expect(result.TeamName).to.equal(params.teamName);

    result.should.have.property('Abbreviation');
    expect(result.Abbreviation).to.equal(params.abbreviation);

    result.should.have.property('Arena');
    expect(result.Arena).to.equal(params.arena);
  });
});