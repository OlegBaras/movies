# OMDB API Movie Search

# Check it live: https://omdb-movies-search.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The task - implement ability to search for any film title and to display a list of personal top 9 films.

You can test it online following the link above, or you can clone/download the repo and run it locally, please note - you will have to add ".env" file to the root level with the environment variable, name it as follows: REACT_APP_API_KEY=[API_KEY]. To get an API_KEY please visit http://www.omdbapi.com/. If you follow the link https://omdb-movies-search.netlify.app/ - API_KEY is set within Netlify Environment variables.

- The top 9 favourite films have its IDs hardcoded and uses ID parameter to fetch further details.
- The search is using Search parameter to fetch the requested keyword films.

- Responsive design (mobile / tablet / desktop)
- Icons come from react-icons.
- State management and display.
- Styling implemented with SCSS.
- Typescript.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
