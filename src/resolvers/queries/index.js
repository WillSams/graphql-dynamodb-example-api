const { dbGet, dbQuery } = require('../../utils/responses');
const { Game, Player, Team } = require('../../models');

const teams = async () =>
  await dbQuery({ query: Team.queryAll })
    .then(data => data);

const teamPlayers = async (root, { teamId }) =>
  await dbQuery({ query: Player.queryByTeam({ teamId }) })
    .then(data => data);

const teamGames = async (root, { teamId }) =>
  await dbQuery({ query: Game.queryByTeam({ teamId }) })
    .then(data => data);

const game = async (root, { teamId, gameId }) =>
  await dbQuery({ query: Game.get({ teamId, gameId }) })
    .then(data => data[0]);

const player = async (root, { teamId, playerId }) =>
  await dbQuery({ query: Player.get({ teamId, playerId }) })
    .then(data => data[0]);

const team = async (root, { teamId }) =>
  await dbGet({ query: Team.get({ teamId }) })
    .then(async data => {
      const players = await teamPlayers(root, { teamId });
      const games = await teamGames(root, { teamId });
      return Object.assign(data, { Players: players, Games: games });
    });

module.exports = {
  game,
  player,
  team,
  teamGames,
  teamPlayers,
  teams,
};