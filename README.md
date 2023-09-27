## How to use

```bash
# install dependencies
$ npm install

# copy .env.exampple to .env and fill the env settings
$ cp .env.example .env

# run on development
$ npm run start

# run on watch mode
$ npm run start:dev

# run on production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# unit tests on development mode
$ npm run test:watch
```

## Running the app with Docker

Run docker container in development mode

```bash
$ docker-compose up
```

Create and run docker container on production

```bash
$ docker build -t app-name . && docker run app-name -p 8080:3000
```