import knex from "knex";

export default knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
<<<<<<< HEAD
    database: "academy",
=======
    database: "academydb",
>>>>>>> 840c5b7474c63ebacc77b17e973f462e7b3cef13
  },
});
