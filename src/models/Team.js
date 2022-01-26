const tableName = `League-${process.env.NODE_ENV}`;
console.log(tableName);

const Team = {
  get: ({ teamId }) => {
    return {
      TableName: tableName,
      Key: {
        Id: teamId,
        Metadata: 'Team',
      }
    };
  },
  put: ({ teamId, teamName, arena }) => {
    return {
      TableName: tableName,
      Item: {
        Id: teamId,
        Metadata: 'Team',
        TeamName: teamName,
        Arena: arena,
      },
    };
  },
  queryAll: {
    TableName: tableName,
    IndexName: 'MetadataIndex',
    ProjectionExpression: 'Id, Metadata, TeamName, Arena',
    ExpressionAttributeNames: { '#p': 'Metadata' },
    KeyConditionExpression: '#p = :v1',
    ExpressionAttributeValues: { ':v1': 'Team' }
  },
};

module.exports = Team;