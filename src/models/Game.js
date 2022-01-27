const tableName = `Soccer-${process.env.NODE_ENV}`;

const Game = {
  get: ({ teamId, gameId }) => {
    return {
      TableName: tableName,
      IndexName: 'MetadataIndex',
      ExpressionAttributeNames: { '#p': 'Metadata', '#a': 'Id' },
      KeyConditionExpression: '#p = :v1',
      FilterExpression: '#a = :v2',
      ExpressionAttributeValues: { ':v1': gameId, ':v2': teamId }
    };
  },
  queryByTeam: ({ teamId }) => {
    return {
      TableName: tableName,
      KeyConditionExpression: 'Id = :v1 and begins_with(Metadata, :v2)',
      ExpressionAttributeValues: { ':v1': teamId, ':v2': 'Game' }
    };
  },
  put: ({ teamId, gameId, gameDay, winLoss }) => {
    return {
      TableName: tableName,
      Item: {
        Id: teamId,
        Metadata: gameId,
        GameDay: gameDay,
        WinLoss: winLoss,
      }
    };
  },
};

module.exports = Game;