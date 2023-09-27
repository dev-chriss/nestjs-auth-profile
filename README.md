## How to use

Install dependencies

```bash
$ npm install
```

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

# unit tests for development mode
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

