## How to use

```bash
# install dependencies
$ npm install

# copy .env.example to .env and update the env settings
$ cp .env.example .env

# run on development
$ npm run start

# run on watch mode
$ npm run start:dev

# run on production mode
$ npm run start:prod
```

Application running at http://localhost:3000



## Test

```bash
# unit tests
$ npm run test

# unit tests on development mode
$ npm run test:watch
```

unit test example is at /src/profiles/profiles.controller.spec.ts



## Running the app with Docker

Run docker container

```bash
$ docker-compose -d
```

Application running at http://localhost:3000