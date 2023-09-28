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

# e2e tests
$ npm run test:e2e
```

unit test example is at `/src/profiles/profiles.controller.spec.ts`<br>
jwt test example is at `/src/test/app.e2e-spec.ts`


## Rest API design

```
get     /api/docs                       swagger documents
post    /api/login                      login with email/username
post    /api/register                   register new user

get     /api/getProfile/:id             get a profile
post    /api/createProfile              create a profile
put     /api/updateProfile/:id          update a profile
post    /api/uploadImage                upload profile photo
get     /api/getImage                   get profile photo
```


## Running the app with Docker

Run docker container

```bash
$ docker-compose -d
```