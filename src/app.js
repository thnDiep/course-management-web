import express from "express";
import moment from "moment";
import { engine } from "express-handlebars";
import morgan from "morgan";
import route from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import hbs_sections from "express-handlebars-sections";
import numeral from "numeral";
import methodOverride from "method-override";
import session from "express-session";
import activate_locals from "./middlewares/locals.mdw.js";
import activate_error from "./middlewares/error.mdw.js";

// get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true
    },
  })
);
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
      format_float_number(value) {
        return numeral(value).format("0.0");
      },
      add(value1, value2) {
        return value1 + value2;
      },
      minus(value1, value2) {
        return value1 - value2;
      },
      ifEquals: function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
      ifOrs: function (arg1, arg2, options) {
        return arg1 || arg2 ? options.fn(this) : options.inverse(this);
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
activate_locals(app);
route(app);
activate_error(app);

app.listen(3000, () => {
  console.log("Listening: http://localhost:3000");
});
