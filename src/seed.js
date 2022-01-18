const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const { createGame, createPlayer, createTeam } = require('./resolvers/mutations');

// teamId, teamName, abbreviation, arena
const teams = [
  { teamId: '1', teamName: 'Augusta GA JUCO', abbreviation: 'AGAJ', arena: 'Milledgeville Ice Center' },
  { teamId: '2', teamName: 'Chattanooga TN JUCO', abbreviation: 'CTNJ', arena: 'Chattanooga Arena' },
  { teamId: '3', teamName: 'Jackson MS JUCO', abbreviation: 'JMSJ', arena: 'Raymond Sports Center' },
  { teamId: '4', teamName: 'Mobile AL JUCO', abbreviation: 'MOBJ', arena: 'Mobile Ice Center' },
  { teamId: '5', teamName: 'Montgomery AL JUCO', abbreviation: 'MONJ', arena: 'Alexander City Arena' },
  { teamId: '6', teamName: 'New Orleans LA JUCO', abbreviation: 'NOLAJ', arena: 'New Orleans Arena' },
  { teamId: '7', teamName: 'Spartanburg SC JUCO', abbreviation: 'SSCJ', arena: 'Spartanburg Memorial Arena' },
];

// teamId, playerId, playerName, position
const players = [
  { teamId: '1', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '1', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '1', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '1', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '1', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '1', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },

  { teamId: '2', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '2', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '2', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '2', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '2', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '2', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },

  { teamId: '3', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '3', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '3', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '3', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '3', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '3', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },

  { teamId: '4', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '4', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '4', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '4', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '4', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '4', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },

  { teamId: '5', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '5', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '5', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '5', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '5', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '5', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },

  { teamId: '6', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '6', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '6', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '6', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '6', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '6', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },

  { teamId: '7', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'G', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '7', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'C', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '7', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '7', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RW', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '7', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'LD', age: faker.random.number({ min: 17, max: 25 }) },
  { teamId: '7', playerId: `Player-${uuidv4()}`, playerName: `${faker.name.firstName()} ${faker.name.lastName()}`, position: 'RD', age: faker.random.number({ min: 17, max: 25 }) },
];

// teamId, gameId, gameDay, winLoss
const games = [
  { teamId: '1', gameId: 'Game-AGAJ01-CTNJ01', gameDay: 'Oct-09-2018', winLoss: 'Win' },
  { teamId: '2', gameId: 'Game-AGAJ01-CTNJ01', gameDay: 'Oct-09-2018', winLoss: 'Loss' },
  { teamId: '3', gameId: 'Game-JMSJ01-MOBJ01', gameDay: 'Oct-09-2018', winLoss: 'Loss' },
  { teamId: '4', gameId: 'Game-MOBJ01-JMSJ01', gameDay: 'Oct-09-2018', winLoss: 'Win' },
  { teamId: '5', gameId: 'Game-MONJ01-NOLAJ', gameDay: 'Oct-10-2018', winLoss: 'Win' },
  { teamId: '6', gameId: 'Game-NOLAJ-MONJ01', gameDay: 'Oct-10-2018', winLoss: 'Loss' },
  { teamId: '7', gameId: 'Game-SSCJ01-AGAJ02', gameDay: 'Oct-16-2018', winLoss: 'Win' },
  { teamId: '1', gameId: 'Game-AGAJ02-SSCJ01', gameDay: 'Oct-16-2018', winLoss: 'Loss' },
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