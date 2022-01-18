process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');

const { reseedDb, removeDbTestData } = require('../../../../specs');

before(async () => await reseedDb());
after(async () => await removeDbTestData());

chai.use(require('chai-http'));
chai.should();

describe('Route - Mutations - /graphql', () => {

  it('`createTeam` mutation should create team', done => {

    const createTeamInput = {
      teamId: 'test-team-4',
      teamName: 'Savannah GA JUCO',
      abbreviation: 'SAVJ',
      arena: 'Savannah Civic Center'
    };

    chai.request(bootstrap)
      .post('/graphql')
      .send({
        query: `mutation CreateTeam($input: CreateTeamInput!) {
          createTeam(input: $input) {
            Id
            Metadata
            TeamName
            Abbreviation
            Arena
          }
        }`,
        variables: { input: createTeamInput }
      })
      .end((err, res) => {
        if (err) return done(err);

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        data.createTeam.should.have.property('Id');
        expect(data.createTeam.Id).to.equal(createTeamInput.teamId);

        data.createTeam.should.have.property('Metadata');
        expect(data.createTeam.Metadata).to.equal('Team');

        data.createTeam.should.have.property('TeamName');
        expect(data.createTeam.TeamName).to.equal(createTeamInput.teamName);

        data.createTeam.should.have.property('Abbreviation');
        expect(data.createTeam.Abbreviation).to.equal(createTeamInput.abbreviation);

        data.createTeam.should.have.property('Arena');
        expect(data.createTeam.Arena).to.equal(createTeamInput.arena);

        done();
      });
  });
});