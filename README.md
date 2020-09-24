# Graphql Prisma Server (Walter)

This graphql server is the backend part for the Web Admin Panel, the Mobile App for residents and the Tablet App for carrier.

### How it works

The server was built using Graphql/prisma. It is connected to a PostgreSQL database that is hosted on Heroku.

## Dependencies

- @graphql-cli/codegen: ^1.17.8
- @graphql-codegen/schema-ast: ^1.17.8
- babel-cli: ^6.26.0
- babel-plugin-transform-object-rest-spread: ^6.26.0
- babel-preset-env: ^1.7.0
- bcryptjs: ^2.4.3
- graphql: ^14.6.0
- graphql-cli: ^4.0.0
- graphql-yoga: ^1.18.3
- jsonwebtoken: ^8.5.1
- prisma-binding: ^2.1.1
- prisma-client-lib: ^1.34.10

## Getting Started

- Install all dependencies using `npm install` command and then `npm start`

## Current Functionality

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password: String!
  phone: String
  packages: [Package!]! @relation(name:"PackageToUser",onDelete:CASCADE)
  unit: Unit! @relation(name:"UnitToUser", onDelete:SET_NULL)
}

type Package {
  id: ID! @id
  owner: User! @relation(name:"PackageToUser",onDelete:SET_NULL)
  pickedUp: Boolean!
  createdAt: DateTime! @createdAt
}

type Unit {
  id: ID! @id
  name: String! @unique
  residents: [User!]! @relation(name:"UnitToUser",onDelete:SET_NULL)
}
```

```
query { users { id email name packages { id } unit { name }}}
query { packages { id createdAt pickedUp owner { name }}}
query { units { id name residents { name }}}

```

## Further Development

- Twilio was added to send sms as notification. The database and the whole workflow need to change email for phone.
- Integrate RabbitMQ with twilio sms system
- Adding subscription to package creation, user deletion, package update.
