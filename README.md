# netflix-cli

An example of implementing a CLI tool that allows to query for Netflix content stored in a static file.

**netflix-cli** is the experiment of using [_commander_](https://github.com/tj/commander.js) package to implement cli apps. _Netflix_ content has been obtained from [Kaggle](https://www.kaggle.com/shivamb/netflix-shows) site.

# Usage

```
$ netflix movies -c Spain # shows all movies with Spain involved in the production
$ netflix shows -duration 1 # shows all tv shows with only 1 season of duration
```

## Commands

The following are the commands supported: 

* _detail_: show information for a movie or tv show,
* _movies_: show information about movies,
* _shows_: show information about tv shows,
* _genres_: list all genres available,
* _ratings_: list all ratings available,
* _help_: show help information for each command.

