const { gql } = require('apollo-server-express');

const typeDefs = gql`
schema {
  query: Query
}

type Team {
  Id: String!
  Metadata: String!
  TeamName: String!
  Abbreviation: String
  Arena: String
}

type Player {
  Id: String!
  Metadata: String!
  PlayerName: String!
  Position: String
}

type Game {
  Id: String!
  Metadata: String!
  GameDay: String!
  WinLoss: String
}

input CreateTeamInput {
  teamId: String!
  teamName: String!
  abbreviation: String
  arena: String
}

input CreateGameInput {
  teamId: String!
  gameId: String!
  gameDay: String!
  winLoss: String
}

input CreatePlayerInput {
  teamId: String!
  playerId: String!
  playerName: String!
  position: String
}

type Mutation {
  createTeam(input: CreateTeamInput!): Team
  createGame(input: CreateGameInput!): Game
  createPlayer(input: CreatePlayerInput!): Player
}

type Query {
  getTeam(teamId: String!): Team
  getGame(teamId: String!, gameId: String!): Game
  getPlayer(teamId: String!, playerId: String!): Player
  listTeams: [Team]
  listTeamPlayers(teamId: String!): [Player]
  listTeamGames(teamId: String!): [Game]
}
`;

module.exports = typeDefs;
