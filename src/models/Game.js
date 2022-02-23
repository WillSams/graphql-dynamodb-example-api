const { soccerTableName } = require('../utils/server');

exports.get = ({ teamId, gameId }) => ({
  TableName: soccerTableName,
  IndexName: 'MetadataIndex',
  ExpressionAttributeNames: { '#p': 'Metadata', '#a': 'Id' },
  KeyConditionExpression: '#p = :v1',
  FilterExpression: '#a = :v2',
  ExpressionAttributeValues: { ':v1': gameId, ':v2': teamId }
});

exports.queryByTeam = ({ teamId }) => ({
  TableName: soccerTableName,
  KeyConditionExpression: 'Id = :v1 and begins_with(Metadata, :v2)',
  ExpressionAttributeValues: { ':v1': teamId, ':v2': 'Game' }
});

exports.put = ({ teamId, gameId, gameDay, winLoss }) => ({
  TableName: soccerTableName,
  Item: {
    Id: teamId,
    Metadata: gameId,
    GameDay: gameDay,
    WinLoss: winLoss,
  }
});