import knex from "knex";

export default knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
    database: "academy",
  },
});
// export default knex({
//   client: "mysql2",
//   connection: {
//     host: "bipcpqjke0vcw6ncfonx-mysql.services.clever-cloud.com",
//     port: 3306,
//     user: "uk7wqkkrtovbyi9u",
//     password: "cS6EvL06OuRboecgkAXa",
//     database: "bipcpqjke0vcw6ncfonx",
//   },
// });
