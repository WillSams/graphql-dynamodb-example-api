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

  it('`createPlayer` mutation should create player', done => {

    const createPlayerInput = {
      teamId: 'test-team-4',
      playerId: 'Player-abc',
      playerName: 'Jane Doe',
      position: 'C'
    };

    chai.request(bootstrap)
      .post('/graphql')
      .send({
        query: `mutation CreatePlayer($input: CreatePlayerInput!) {
          createPlayer(input: $input) {
            Id
            Metadata
            PlayerName
            Position
          }
        }`,
        variables: { input: createPlayerInput }
      })
      .end((err, res) => {
        if (err) return done(err);

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        data.createPlayer.should.have.property('Id');
        expect(data.createPlayer.Id).to.equal(createPlayerInput.teamId);

        data.createPlayer.should.have.property('Metadata');
        expect(data.createPlayer.Metadata).to.equal(createPlayerInput.playerId);

        data.createPlayer.should.have.property('PlayerName');
        expect(data.createPlayer.PlayerName).to.equal(createPlayerInput.playerName);

        data.createPlayer.should.have.property('Position');
        expect(data.createPlayer.Position).to.equal(createPlayerInput.position);

        done();
      });
  });
});