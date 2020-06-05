Requires running instance of redis!
An attempt to build a clone of Adventure Capitalist, Redis/Node/Express/React
To run app:

1. Have a running instance of Redis (redis-server)
2. (Optional) client instance of Redis
3. cd /src/backend/data/
4. node app.js to start backend
5. npm start to start frontend

Assumptions:

1. This app only supports one player
2. The game bonuses only go up to 2000 of each business
3. There are only businesses from earth that are available
4. Only upgrades until Monopoly (1 trillion) are available

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
