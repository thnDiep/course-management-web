import knex from "knex";

export default knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
<<<<<<< HEAD
    database: "academydb",
=======
    database: "academy",
>>>>>>> c9e44abc71594a48183f8a89bc34964d04ca722d
  },
});
