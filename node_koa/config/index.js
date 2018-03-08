module.exports = {
  "port": 8000,
  "db": "mongodb://localhost/nodeKoa",
  "jwt": {
    "key": "user",
    "expire": "14 days",
    "collection": "tokens",
    "secret": "shared-secret"
  }
}
