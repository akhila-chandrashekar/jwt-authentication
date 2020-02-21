module.exports = {
    development: {
      port: process.env.PORT || 3000,
      saltingRounds: 10,
      host: "localhost",
      db: {
        url: "mongodb://localhost:27017",
        databaseName: "users"
      },
      JWT_SECRET: "anysecretkeywillwork"
    }
}