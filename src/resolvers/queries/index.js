const { dbGet, dbQuery } = require('../../utils/responses');
const { Game, Player, Team } = require('../../models');

const teams = () =>
  dbQuery({ query: Team.queryAll })
    .then(data => {
      return data
    });

const teamPlayers = (root, { teamId }) =>
  dbQuery({ query: Player.queryByTeam({ teamId }) })
    .then(data => data);

const teamGames = (root, { teamId }) =>
  dbQuery({ query: Game.queryByTeam({ teamId }) })
    .then(data => data);

const game = (root, { teamId, gameId }) =>
  dbQuery({ query: Game.get({ teamId, gameId }) })
    .then(data => data[0]);

const player = (root, { teamId, playerId }) =>
  dbQuery({ query: Player.get({ teamId, playerId }) })
    .then(data => data[0]);

const team = (root, { teamId }) =>
  dbGet({ query: Team.get({ teamId }) })
    .then(data => {
      const players = teamPlayers(root, { teamId }).then(data => data);
      const games = teamGames(root, { teamId }).then(data => data);
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