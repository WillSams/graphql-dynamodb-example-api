const { dbGet, dbQuery } = require('../../utils/responses');
const { Game, Player, Team } = require('../../models');

const listTeams = async () =>
  await dbQuery({ query: Team.queryAll })
    .then(data => data);

const listTeamPlayers = async (root, { teamId }) =>
  await dbQuery({ query: Player.queryByTeam({ teamId }) })
    .then(data => data);

const listTeamGames = async (root, { teamId }) =>
  await dbQuery({ query: Game.queryByTeam({ teamId }) })
    .then(data => data);

const getGame = async (root, { teamId, gameId }) =>
  await dbQuery({ query: Game.get({ teamId, gameId }) })
    .then(data => data[0]);

const getPlayer = async (root, { teamId, playerId }) =>
  await dbQuery({ query: Player.get({ teamId, playerId }) })
    .then(data => data[0]);

const getTeam = async (root, { teamId }) =>
  await dbGet({ query: Team.get({ teamId }) })
    .then(async data => {
      const players = await listTeamPlayers(root, { teamId });
      const games = await listTeamGames(root, { teamId });
      return Object.assign(data, { Players: players, Games: games });
    });


module.exports = {
  getGame,
  getPlayer,
  getTeam,
  listTeamGames,
  listTeamPlayers,
  listTeams,
};