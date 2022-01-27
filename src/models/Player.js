const tableName = `Soccer-${process.env.NODE_ENV}`;

const Player = {
  get: ({ teamId, playerId }) => {
    return {
      TableName: tableName,
      IndexName: 'MetadataIndex',
      ExpressionAttributeNames: { '#p': 'Metadata', '#a': 'Id' },
      KeyConditionExpression: '#p = :v1',
      FilterExpression: '#a = :v2',
      ExpressionAttributeValues: { ':v1': playerId, ':v2': teamId }
    };
  },
  queryByTeam: ({ teamId }) => {
    return {
      TableName: tableName,
      KeyConditionExpression: 'Id = :v1 and begins_with(Metadata, :v2)',
      ExpressionAttributeValues: { ':v1': teamId, ':v2': 'Player' }
    };
  },
  put: ({ teamId, playerId, playerName, position, details }) => {
    return {
      TableName: tableName,
      Item: {
        Id: teamId,
        Metadata: playerId,
        PlayerName: playerName,
        Position: position,
        ...details
      }
    };
  },
};

module.exports = Player;