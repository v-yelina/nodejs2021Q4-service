# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker Desktop ](https://docs.docker.com/get-docker/).

## Downloading

```
git clone https://github.com/v-yelina/nodejs2021Q4-service.git
```

## Running application with Docker

```
Build and run Docker images
```
docker compose up
```

After starting containers the rest-service app will be available on specified port (4000 as default).

## Running application without Docker

```
npm run build
npm start
```

After starting the rest-service app will be available on specified port (4000 as default).

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

### Auto-fix and format

```
npm run lint
```

