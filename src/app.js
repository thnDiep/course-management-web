import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import route from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs_sections from 'express-handlebars-sections';

// get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Logger HTTP
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

// Static file in public folder
app.use(express.static(path.join(__dirname, '/public/')));

// Config handlebars
// Config handlebars
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            section(name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
route(app);

app.listen(3000, () => {
    console.log('Listening: http://localhost:3000');
});
