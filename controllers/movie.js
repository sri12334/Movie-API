import findMovie from '../utils/findMovie.js';

let movies = [
    { id: '1', title: 'Inception', director: 'Christopher Nolan', year: 2010 },
    { id: '2', title: 'The Matrix', director: 'The Wachowskis', year: 1999 },
    { id: '3', title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];


const movieControllers = {
    getMovies: (req, res) => {
        res.status(200).json(movies);
    },
    getMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = findMovie(movies, id);
        if (movieExist) {
            res.status(200).json(movieExist);
        } else {
            res.status(404).json({ message: 'Movie does not exist' });
        }
    },
    createMovie: (req, res) => {
        const { title, director, year } = req.body;
        if (!title || !director || !year) {
            res.status(400).json({
                message: 'please provide title, director and year'
            });
        } else {
            const newMovie = {
                id: String(movies.length + 1),
                title,
                director,
                year
            };
            movies.push(newMovie);
            res.status(201).json(newMovie);
        }
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { title, director, year } = req.body;

        const movieExist = findMovie(movies, id);
        if (movieExist) {
            if (!title || !director || !year) {
                res.status(400).json({
                    message: 'Please provide title, director and year'
                });
            } else {
                movieExist.title = title;
                movieExist.director = director;
                movieExist.year = year;
                res.status(200).json(movieExist);
            }
        } else {
            res.status(404).json({
                message: `Movie with id: ${id} does not exist`
            });
        }
    },
    deleteMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = findMovie(movies, id);
        if (movieExist) {
            movies = movies.filter((movie) => movie.id !== id);
            res.status(200).json({
                message: `Movie with id ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                message: `Movie with id: ${id} does not exist`
            });
        }
    }
};

export default movieControllers;