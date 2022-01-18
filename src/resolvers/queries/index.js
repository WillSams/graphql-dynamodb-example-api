const { dbGet, dbQuery } = require('../../utils/responses');
const { Game, Player, Team } = require('../../models');

const getGame = async (root, { teamId, gameId }) =>
  dbQuery({ query: Game.get({ teamId, gameId }) })
    .then(data => data[0]);

const getPlayer = async (root, { teamId, playerId }) =>
  dbQuery({ query: Player.get({ teamId, playerId }) })
    .then(data => data[0]);

const getTeam = async (root, { teamId }) =>
  dbGet({ query: Team.get({ teamId }) })
    .then(data => data);

const listTeams = async () =>
  dbQuery({ query: Team.queryAll })
    .then(data => data);

const listTeamPlayers = async (root, { teamId }) =>
  dbQuery({ query: Player.queryByTeam({ teamId }) })
    .then(data => data);

const listTeamGames = async (root, { teamId }) =>
  dbQuery({ query: Game.queryByTeam({ teamId }) })
    .then(data => data);

module.exports = {
  getGame,
  getPlayer,
  getTeam,
  listTeamGames,
  listTeamPlayers,
  listTeams,
};