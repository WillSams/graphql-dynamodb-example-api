const { soccerTableName } = require('../utils/server');

exports.get = ({ teamId, playerId }) => ({
  TableName: soccerTableName,
  IndexName: 'MetadataIndex',
  ExpressionAttributeNames: { '#p': 'Metadata', '#a': 'Id' },
  KeyConditionExpression: '#p = :v1',
  FilterExpression: '#a = :v2',
  ExpressionAttributeValues: { ':v1': playerId, ':v2': teamId }
});

exports.queryByTeam = ({ teamId }) => ({
  TableName: soccerTableName,
  KeyConditionExpression: 'Id = :v1 and begins_with(Metadata, :v2)',
  ExpressionAttributeValues: { ':v1': teamId, ':v2': 'Player' }
});

exports.put = ({ teamId, playerId, playerName, position, details }) => ({
  TableName: soccerTableName,
  Item: {
    Id: teamId,
    Metadata: playerId,
    PlayerName: playerName,
    Position: position,
    ...details
  },
});