const CSVer = require('csver');
const data = new CSVer('./data/netflix_titles.csv').asObject();

const { Command } = require('commander');
const app = new Command();

const Detail = require('./command/detail.js');
app.addCommand(new Detail(data));

const Movies = require('./command/movies.js');
app.addCommand(new Movies(data));

const TvShows = require('./command/shows.js');
app.addCommand(new TvShows(data));

const Genres = require('./command/genres.js');
app.addCommand(new Genres(data));

const Ratings = require('./command/ratings.js');
app.addCommand(new Ratings(data));

app.parse(process.argv);