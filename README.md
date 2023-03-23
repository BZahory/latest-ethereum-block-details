# Check it out!

The website is hosted on my website here: [http://bzah.bz/latest-ethereum-block-details/](http://bzah.bz/latest-ethereum-block-details/)

# Description

I used React with TypeScript as the main framework. We get the API data using Axios and
Alchemy’s SDK in the Redux Actions; useEffect() and setInterval()/setTimeout() are used to call
the API every 12 seconds when successful or every 3 seconds otherwise. The reducer
processes the actions, then modifies an otherwise immutable global state. Selectors in the
components (i.e., transaction list items, ERC-20 transfers modal) read this state.

There are pieces in place meant to make the code scalable (e.g., use of a root reducer, TS and
lint rules, expandable file structure), with the notable exception of a react-router-dom
implementation; it's unclear if this would scale as a single-page application or not until further
development, so this would violate the boat anchor principle if done right now.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn deploy`

Deploys the app to the `gh-pages` branch, which is hosted on the website at the top of this README.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
