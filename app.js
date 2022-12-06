import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import route from "./routes/index.js";
import hbs_sections from "express-handlebars-sections";
const app = express();

// Logger HTTP
app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// static file in public folder
app.use("/public", express.static("public"));

// Config handlebars
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    helpers: {
      section(name, options) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

route(app);

app.listen(3000, () => {
  console.log("Listening: http://localhost:3000");
});
