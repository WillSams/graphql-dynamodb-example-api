# Test Queries

Pre-requisites for local data:
    1. Start Docker container with `docker-compose up -d`.
    2. Execute the league data model file, `./database/local/league_model.sh` script to generate the database.

NOTE: Alternatively, if you rather use the [AWS NoSql Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html):
    1. Start Docker container with `docker-compose up -d`.
    2. Import the data model file, `./database/nosql_workbench_model.json`, in.
    3. With NoSql Workbench, go into the `Visualizer` and commit your database to your local DynamoBb.
    4  Grab the credentials NoSql Workbench created for the connection and add them to ~/.aws/credentials file under a new profile called `test`.
    5. Run same aws dynamodb queries but add the `--profile localhost-user` flag.

## Sanity check

```bash
# Sanity check
# Note: table was created using the model data
aws dynamodb describe-table \
  --endpoint-url http://localhost:8042 \
  --table-name League \
  --profile localhost-user \
  --region localhost
```

## Team

```bash
# ALL TEAMS *******************************************
# Quering Local DynamoDB container
aws dynamodb query \
  --endpoint-url http://localhost:8042 \
  --table-name League \
  --index-name 'MetadataIndex' \
  --projection-expression 'Metadata, TeamName, Abbreviation, Arena' \
  --key-condition-expression "Metadata = :v1" \
  --expression-attribute-values '{ ":v1":{"S":"Team"} }' \
  --profile localhost-user \
  --region localhost

# Querying API using Curl 
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"{ listTeams {  Id \n Metadata \n TeamName \n Abbreviation \n Arena } }"}' \
http://localhost:4040/graphql

#GraphQL query
query ListTeams {
  listTeams {
    Id
    Metadata
    TeamName
    Abbreviation
    Arena
  }
}

# SINGLE TEAM BY ID (DEFAULT INDEX) ******************************
# Quering Local DynamoDB container
aws dynamodb get-item \
  --endpoint-url http://localhost:8042 \
  --table-name League \
  --key '{ "Id": {"S": "1"}, "Metadata": { "S": "Team" } }' \
  --profile localhost-user \
  --region localhost

# Querying API using Curl
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"{ getTeam(teamId: \"1\") {  \n Metadata \n TeamName \n Abbreviation \n Arena \n } }"}' \
http://localhost:4040/graphql

#GraphQL query
query GetTeam($teamId: String!) {
  getTeam(teamId: $teamId) {
    Metadata
    TeamName
    Abbreviation
    Arena
  }
}
```

## GAMES

```bash
# Games By TeamID (DEFAULT INDEX) ******************************
aws dynamodb query \
  --endpoint-url http://localhost:8042 \
  --table-name League \
  --key-condition-expression "Id = :v1 and begins_with(Metadata, :v2)" \
  --expression-attribute-values '{":v1":{"S":"1"}, ":v2":{"S":"Game"}}' \
  --profile localhost-user \
  --region localhost

# Querying API using Curl
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"{ listTeamGames(teamId: \"7\") {  \n Id \n Metadata \n GameDay \n WinLoss \n } }"}' \
http://localhost:4040/graphql

#GraphQL query
query ListTeamGames($teamId: String!) {
  listTeamGames(teamId: $teamId) {
    Id
    Metadata
    GameDay
    WinLoss
  }
}
```

## Players

```bash
# PLAYERS BY TeamID (DEFAULT INDEX) ******************************
aws dynamodb query \
  --endpoint-url http://localhost:8042 \
  --table-name League \
  --key-condition-expression "Id = :v1 and begins_with(Metadata, :v2)" \
  --expression-attribute-values '{":v1":{"S":"1"}, ":v2":{"S":"Player"}}' \
  --profile localhost-user \
  --region localhost

# Querying API using Curl
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"{ listTeamPlayers(teamId: \"2\") { \n Id \n Metadata \n PlayerName \n Position \n } }"}' \
http://localhost:4040/graphql

#GraphQL query
query ListTeamPlayers($teamId: String!) {
  listTeamPlayers(teamId: $teamId) {
    Id
    Metadata
    PlayerName
    Position
  }
}
```
