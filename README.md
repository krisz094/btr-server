# Be The Richest - Dashboard Web App

a [Sails v1](https://sailsjs.com) application

* ```app.yaml``` format:

```
runtime: nodejs
env: flex

# The following env variables may contain sensitive information that grants
# anyone access to your database. Do not add this file to your source control.
env_variables:
  SQL_USER: [USER]
  SQL_PASSWORD: [PW]
  SQL_DATABASE: [DB]
  # e.g. my-awesome-project:us-central1:my-cloud-sql-instance
  INSTANCE_CONNECTION_NAME: [INSTANCE_NAME]
  MONGO_NAME: [USER]
  MONGO_PW: [PW]
```
