process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const bootstrap = require('../../../../src/bootstrap');
const { reseedDb, removeDbTestData } = require('../../../../specs');

chai.use(require('chai-http'));
chai.should();


describe('Route - Mutations - /graphql', () => {
  before(async () => await reseedDb());
  after(async () => await removeDbTestData());

  it('`createGame` mutation should create game', done => {

    const createGameInput = {
      teamId: 'test-team-4',
      gameId: 'Game-123',
      gameDay: 'Oct-24-2022',
      winLoss: 'Loss'
    };

    chai.request(bootstrap)
      .post('/graphql')
      .send({
        query: `mutation CreateGame($input: CreateGameInput!) {
          createGame(input: $input) {
            Id
            Metadata
            GameDay
            WinLoss
          }
        }`,
        variables: { input: createGameInput }
      })
      .end((err, res) => {
        if (err) return done(err);

        res.headers["content-type"].should.contains('application/json');

        const data = res?.body?.data;

        data.createGame.should.have.property('Id');
        expect(data.createGame.Id).to.equal(createGameInput.teamId);

        data.createGame.should.have.property('Metadata');
        expect(data.createGame.Metadata).to.equal(createGameInput.gameId);

        data.createGame.should.have.property('GameDay');
        expect(data.createGame.GameDay).to.equal(createGameInput.gameDay);

        data.createGame.should.have.property('WinLoss');
        expect(data.createGame.WinLoss).to.equal(createGameInput.winLoss);

        done();
      });
  });
});