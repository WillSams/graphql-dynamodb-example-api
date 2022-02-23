const { soccerTableName } = require('../utils/server');

exports.get = ({ teamId }) => ({
  TableName: soccerTableName,
  Key: {
    Id: teamId,
    Metadata: 'Team',
  }
});

exports.put = ({ teamId, teamName, arena }) => ({
  TableName: soccerTableName,
  Item: {
    Id: teamId,
    Metadata: 'Team',
    TeamName: teamName,
    Arena: arena,
  },
});

exports.queryAll = ({
  TableName: soccerTableName,
  IndexName: 'MetadataIndex',
  ProjectionExpression: 'Id, Metadata, TeamName, Arena',
  ExpressionAttributeNames: { '#p': 'Metadata' },
  KeyConditionExpression: '#p = :v1',
  ExpressionAttributeValues: { ':v1': 'Team' }
});