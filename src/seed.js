const { v4: uuidv4 } = require('uuid');

const { createGame, createPlayer, createTeam } = require('./resolvers/mutations');
const seeder = require('../src/utils/seeder');

// teamId, teamName, arena
const teams = [
  {
    teamId: 'boysU9', teamName: 'Boys U9', arena: 'City Complex A'
  },
  {
    teamId: 'boysU11', teamName: 'Boys U11', arena: 'City Complex B'
  },
  {
    teamId: 'boysU13', teamName: 'Boys U13', arena: 'City Complex C'
  },
  {
    teamId: 'boysU15', teamName: 'Boys U15', arena: 'City Complex D'
  },
  {
    teamId: 'girlsU9', teamName: 'Girls U9', arena: 'City Complex A'
  },
  {
    teamId: 'girlsU11', teamName: 'Girls U11', arena: 'City Complex B'
  },
  {
    teamId: 'girlsU13', teamName: 'Girls U13', arena: 'City Complex C'
  },
  {
    teamId: 'girlsU15', teamName: 'Girls U15', arena: 'City Complex D'
  },
];

const createFakePlayer = ({ team, position, }) => ({
  teamId: `${team.teamId}`, playerId: `Player-${uuidv4()}`,
  playerName: seeder.getFakeName(team.teamId),
  position,
  details: {
    BirthDate: seeder.getFakeBirthdate(team.teamId),
    Height: seeder.getFakeHeight(team.teamId),
    Weight: seeder.getFakeWeight(team.teamId),
    Jersey: seeder.getFakeJerseyNumber(),
    Shoots: seeder.getShootingFoot(),
    Hometown: seeder.getFakeHomeTown()
  }
});

let players = [];
const forwardsCount, defendersCount = 5;
const midfieldersCount = 6;
const goaliesCount = 2;
teams.forEach(team => {
  for (let i = 0; i < forwardsCount; i++)
    players = players.concat([createFakePlayer({ team, position: 'F' })]);

  for (let i = 0; i < midfieldersCount; i++)
    players = players.concat([createFakePlayer({ team, position: 'M' })]);

  for (let i = 0; i < defendersCount; i++)
    players = players.concat([createFakePlayer({ team, position: 'D' })]);

  for (let i = 0; i < goaliesCount; i++)
    players = players.concat([createFakePlayer({ team, position: 'G' })]);
});

// teamId, gameId, gameDay, winLoss
const games = [
  { teamId: 'boysU9', gameId: 'Game-boysU9-2021-01', gameDay: 'April-17-2021', winLoss: 'Win' },
  { teamId: 'boysU11', gameId: 'Game-boysU11-2021-01', gameDay: 'April-17-2021', winLoss: 'Loss' },
  { teamId: 'boysU13', gameId: 'Game-boysU13-2021-01', gameDay: 'April-17-2021', winLoss: 'Loss' },
  { teamId: 'boysU15', gameId: 'Game-boysU15-21-01', gameDay: 'April-17-2021', winLoss: 'Win' },
  { teamId: 'girlsU9', gameId: 'Game-girlsU9-2021-01', gameDay: 'April-17-2021', winLoss: 'Loss' },
  { teamId: 'girlsU11', gameId: 'Game-girlsU11-2021-01', gameDay: 'April-17-2021', winLoss: 'Win' },
  { teamId: 'girlsU13', gameId: 'Game-girlsU13-2021-01', gameDay: 'April-17-2021', winLoss: 'Win' },
  { teamId: 'girlsU15', gameId: 'Game-girlsU15-21-01', gameDay: 'April-17-2021', winLoss: 'Loss' },
];

const seedDatabase = () => {
  try {
    console.log('Begin seeding of database...');

    teams.map(input => createTeam(null, { input }));
    players.map(input => createPlayer(null, { input }));
    games.map(input => createGame(null, { input }));

    console.log('End of seeding of database.');

  } catch (ex) {
    console.error('DynamoDB Seeding Failed! - ', ex.message);
  }
};

seedDatabase();