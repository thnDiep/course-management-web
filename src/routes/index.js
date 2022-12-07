import searchRoute from './search.route.js';

export default function route(app) {
    // Routes

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/profile', (req, res) => {
        res.render('profile');
    });

    app.get('/courses', (req, res) => {
        res.render('courses');
    });

    app.use('/search', searchRoute);
}
