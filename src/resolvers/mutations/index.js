const { dbGet, dbPut, dbQuery, } = require('../../utils/responses');
const { Game, Player, Team } = require('../../models');

const createTeamRelatedEntity = async ({ item, query }) => {
  await dbPut({ item });
  return dbQuery({ query }).then(data => data[0]);
};

const createTeam = async (root, { input }) => {
  await dbPut({ item: Team.put({ ...input }) });
  return dbGet({ query: Team.get({ teamId: input.teamId }) })
    .then(data => data);
};

const createGame = (root, { input }) =>
  createTeamRelatedEntity({
    item: Game.put({ ...input }),
    query: Game.get({ teamId: input.teamId, gameId: input.gameId })
  });

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
