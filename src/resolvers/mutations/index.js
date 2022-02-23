const { dbGet, dbPut, dbQuery, } = require('../../utils/responses');
const { Game, Player, Team } = require('../../models');

const createTeamRelatedEntity = ({ item, query }) =>
  dbPut({ item })
    .then(() => dbQuery({ query }).then(data => data[0]));

const createTeam = (root, { input }) =>
  dbPut({ item: Team.put({ ...input }) })
    .then(() =>
      dbGet({ query: Team.get({ teamId: input.teamId }) }).then(data => data));

const createGame = (root, { input }) =>
  createTeamRelatedEntity({
    item: Game.put({ ...input }),
    query: Game.get({ teamId: input.teamId, gameId: input.gameId })
  }).then(data => data);

const createPlayer = (root, { input }) =>
  createTeamRelatedEntity({
    item: Player.put({ ...input }),
    query: Player.get({ teamId: input.teamId, playerId: input.playerId })
  });

module.exports = {
  createTeam,
  createGame,
  createPlayer,
};
