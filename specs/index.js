process.env.NODE_ENV = 'test';

const { spawn } = require('child_process');

const { createGame, createPlayer, createTeam } = require('../src/resolvers/mutations');

const teams = [
  { teamId: 'test-team-1', teamName: 'Test Team 1', abbreviation: 'TT01', arena: 'Test Team 1 Arena' },
  { teamId: 'test-team-2', teamName: 'Test Team 2', abbreviation: 'TT02', arena: 'Test Team 2 Arena' },
  { teamId: 'test-team-3', teamName: 'Test Team 3', abbreviation: 'TT03', arena: 'Test Team 3 Arena' },
];

const players = [
  {
    teamId: 'test-team-1',
    playerId: 'Player-123',
    playerName: 'Test Player1',
    position: 'G'
  },
  {
    teamId: 'test-team-1',
    playerId: 'Player-456',
    playerName: 'Test Player3',
    position: 'LW'
  },
  {
    teamId: 'test-team-2',
    playerId: 'Player-789',
    playerName: 'Test Player4',
    position: 'RD',
  },
];

// teamId, gameId, gameDay, winLoss
const games = [
  { teamId: 'test-team-1', gameId: 'Game-1', gameDay: 'Jan-10-2022', winLoss: 'Win' },
  { teamId: 'test-team-2', gameId: 'Game-2', gameDay: 'Jan-10-2022', winLoss: 'Loss' },
  { teamId: 'test-team-3', gameId: 'Game-3', gameDay: 'Jan-17-2022', winLoss: 'Win' },
  { teamId: 'test-team-1', gameId: 'Game-4', gameDay: 'Jan-17-2022', winLoss: 'Loss' },

];

const reseedDb = async () => {
  teams.map(input => createTeam(null, { input }));
  players.map(input => createPlayer(null, { input }));
  games.map(input => createGame(null, { input }));
};

const removeDbTestData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  spawn(`${__dirname}/database/clean_db.sh`);
  await new Promise((resolve) => setTimeout(resolve, 150));
};

module.exports = {
  reseedDb,
  removeDbTestData,
}