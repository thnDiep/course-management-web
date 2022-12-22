import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import route from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import hbs_sections from "express-handlebars-sections";
import numeral from "numeral";
import methodOverride from "method-override";

// get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Logger HTTP
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

// Static file in public folder
app.use(express.static(path.join(__dirname, "/public/")));
app.use(methodOverride("_method"));
// Config handlebars
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    helpers: {
      section: hbs_sections(),
      format_number(value) {
        return numeral(value).format("0,0");
      },
      add(value1, value2) {
        return value1 + value2;
      },
      minus(value1, value2) {
        return value1 - value2;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
route(app);

app.listen(3000, () => {
  console.log("Listening: http://localhost:3000");
});
