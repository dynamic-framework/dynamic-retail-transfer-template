# Dynamic retail transfer template - React

## Requirements:
- Node@18+
- npm@9+
- @modyo/cli@latest

## Installation and initial setup
The best way to install this template is using the [modyo-cli](https://docs.modyo.com/en/platform/channels/cli.html)
```console
npx @modyo/cli@latest get dynamic-retail-transfer-template my-project
cd my-project
npm i
npm run start
```

### Setup
1. Change the property name in `package.json` to the name of your project
2. Change the root `id` in `public/index.html:32` and `src/index.tsx:15`

**Note**: The root id should be _unique_ in your site and it should be written in camelCase.

## Deployment to Modyo and CI
To be able to deploy to Modyo configure the following variables in an `.env` file or as part of the Continuous Integration:
```yaml
# The url base of the organization in Modyo
MODYO_ACCOUNT_URL=https://my-org.modyo.cloud/
# Where you will deploy your micro frontend, you can use either the host or the ID but not both.
# MODYO_SITE_HOST=my-site
MODYO_SITE_ID=65
# The token authorizing the deployment, taken from Modyo
TOKEN=gT0ogW43lSy4nV9cYtc_hH0i_sUNq01q-12ptFzoW8
# The major version of the Modyo platform where the deployment will take place (8 or 9)
VERSION=9
# The name of the directory that contains the bundle of the micro frontend
BUILD_DIRECTORY=build
# The name that will identify your Micro Frontend in Modyo
WIDGET_NAME=my-project
# This directive is necessary to safely remove some libraries from the liquid parser
MODYO_DISABLE_LIQUID_REGEX=raw
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.