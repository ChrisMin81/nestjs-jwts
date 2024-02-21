# NestJs Jwt Authentication example with access token and refresh token - Integration and End-to-end tests included

This is an example of how to implement an authentication system in NestJs using passport.js, and json web tokens (JWT).

I've included integration tests in the auth module under "test" folder.

The e2e tests on the other hand are in the root test folder.

```bash
yarn test # run integration test
yarn test:e2e # run e2e tests
```

The code reflects what was explained in the video:

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/uAKzFhE3rxU/0.jpg)](https://www.youtube.com/watch?v=uAKzFhE3rxU)


### Upgrade dependencies
```bash
yarn add @nestjs/common @nestjs/config @nestjs/core @nestjs/jwt @nestjs/passport @nestjs/platform-express @prisma/client argon2 class-transformer class-validator passport passport-jwt reflect-metadata rimraf rxjs
```

### Upgrade dev dependencies 
```bash
yarn add --dev @nestjs/cli @nestjs/schematics @nestjs/testing @types/express @types/jest @types/node @types/passport-jwt @types/supertest @typescript-eslint/eslint-plugin @typescript-eslint/parser dotenv-cli eslint eslint-config-prettier eslint-plugin-prettier jest prettier prisma source-map-support supertest ts-jest ts-loader ts-node tsconfig-paths typescript
```

### Migrate the db
```bash
npx dotenv -e .env -- prisma migrate reset --force
```