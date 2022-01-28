# Example Serverless JavaScript API

Serverless Example API using Express JS, Apollo Server, AWS Lambda, API Gateway, and DynamoDb.

![text](api-1.png)
![text](api-2.png)

_TODO_:

- Write more tests.
- Add token-based authentication.
- Add delete mutations
- Utilize different types other than strings

## Pre-requisites

The installation instructions are targeting Debian-based distros (Ubuntu, Linux Mint, etc.) but they can also work under [Windows using the Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about).  The following tools need to be installed:

- Install [direnv](https://direnv.net).
- Install [Docker](https://www.docker.com).
- Install [NodeJS](https://nodejs.org/en/download/).
- Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
- For deployments to AWS, a [Serverless account](https://app.serverless.com/).

```bash
cp .envrc.example .envrc && direnv allow
```

The base file should get you started but the following instructions should be followed to correctly get the environment variables set.

### Installing Node Version Manager (NVM)

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
echo 'export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc
source ~/.bashrc
nvm install lts/fermium # Node 14x because Amazon hasn't upgraded their framework yet :( 
```

## Getting Site Up & Running for the first time

Finally, it's time to start the AP.  This can be done by executing the following (with all steps, even the ones above):

```bash
nvm use                   # use the version of NodeJS listed in .nvmrc
npm i -g serverless       # installs Serverless globally to your lts/fermium install
npm i                     # install the packages listed in package.json

cp .envrc.example .envrc  # Set your environment variables in .envrc
direnv allow

docker-compose up -d      # Spin up the DynamoDb Docker container
npm run seed              # create and seed the Soccer-development table

cp serverless.yml.example serverless.yml  # set your Serverless 'org' in severless.yml

serverless login          # will open a browser

# Install the plugin to simulate AWS Lambda and API Gateway locally
serverless plugin install -n serverless-offline                     
serverless offline start --httpPort $API_PORT --region $AWS_REGION
```

You can now go to http://localhost:4040/api/about for a quick sanity check.

You can also use 'curl' in a terminal window to creat a team:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: bearer $API_TOKEN" \
-d '{
    "query":"mutation CreateTeam($input: CreateTeamInput!) { createTeam(input: $input) { Id Metadata TeamName Arena  } }",
    "variables": {"input":{"teamId":"test-team-1","teamName":"Test Team","arena":"Test Team Arena"}}
  }' \
http://localhost:4040/api/graphql
```

Which should result in:

```bash
{"data":{"createTeam":{"Id":"test-team-1","Metadata":"Team","TeamName":"Test Team","Arena":"Test Team Arena"}}}
```

## Deploying to AWS

```bash
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying example-api-project to stage staging (us-east-1)

✔ Service deployed to stack example-api-project-staging-api (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: example-api-project-staging-api (766 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). Additionally, in current configuration, the DynamoDB table will be removed when running `serverless remove`. To retain the DynamoDB table even after removal of the stack, add `DeletionPolicy: Retain` to its resource definition.

### Invocation

After successful deployment, you can do a quick sanity check by calling:

```bash
curl -X GET https://xxxxxx.execute-api.us-east-1.amazonaws.com/api/about
```

You can create a new team by calling the corresponding endpoint:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "Authorization: bearer $API_TOKEN" \
-d '{
    "query":"mutation CreateTeam($input: CreateTeamInput!) { createTeam(input: $input) { Id Metadata TeamName Arena  } }",
    "variables": {"input":{"teamId":"test-team-1","teamName":"Test Team","arena":"Test Team Arena"}}
  }' \
https://xxxxxx.execute-api.us-east-1.amazonaws.com/api/about
```

Which should result in the following response:

```bash
{"data":{"createTeam":{"Id":"test-team-1","Metadata":"Team","TeamName":"Test Team","Arena":"Test Team Arena"}}}
```
