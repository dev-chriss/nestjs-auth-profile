## How to use

Install dependencies

```bash
$ npm install
```

Run docker container in development mode

```bash
$ npm run docker:dev
```

or

```bash
$ docker-compose up
```

Create and run docker container on production

```bash
$ docker build -t app-name . && docker run app-name -p 8080:3000
```

## Running the app without Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```