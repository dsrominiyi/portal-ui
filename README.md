# Portal UI

## Info
This is a client-side rendered React single page application which makes use of React Redux and React Router.

[TypeScript](https://www.typescriptlang.org/) has been used to write all code in the application to protect against
type errors at compilation. This is compiled using [Webpack](https://webpack.js.org/).

[SCSS](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)#SCSS) is used to pre-process all CSS, this is also built using webpack.
We're making use of [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader) to allow us to import
css class names directly into our component files,
in addition to [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) which compiles all of our stylesheets
into a single file which is referenced in the page markup.

[Yarn](https://yarnpkg.com/lang/en/) is being used in this repo as opposed to NPM.

## Tests
``$ yarn test`` Runs unit tests.

Tests are written in TypeScript using [Jest](https://jestjs.io/) and [ts-jest](https://github.com/kulshekhar/ts-jest) to
compile the TyeScript on the fly for the tests. [Enzyme](https://airbnb.io/enzyme/) is being used for testing React components.

## Linting
[ESLint](https://eslint.org/) is used to lint the TypeScript to a combination of recommended standards with some modifications where appropriate.
We also make use of the [Prettier](https://prettier.io/) plugin for ESLint to enforce consistent formatting.

[stylelint](https://stylelint.io/) is used to lint the SCSS following the [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
again with modifications where appropriate.

It is recommended that you integrate ESLint and stylelint with your chosen IDE
in order to get real-time feedback on whether or not your code is adhering to standards.
There are ESLint and stylelint extensions available for VSCode.

## EditorConfig
We make use of [EditorConfig](https://editorconfig.org/) to ensure consistent configuration
of our editors, this is natively supported in
[Visual Studio Code](https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2019)
and support can be added via [plugins](https://editorconfig.org/#download) for many other editors.

The configuration is all handed in the `.editorconfig` file, and follows a very simple
[INI format](https://editorconfig.org/#file-format-details).

## Installation
Install Node on your local machine, v10.x in addition to Yarn

``$ yarn install``

## Running locally
``$ yarn start``

Were using [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/) to run the web app locally. This can be accessed at localhost:3000

## Storybook
We are using [Storybook](https://storybook.js.org/) to allow us to prototype our react components and view them in a variety of scenarios.
Stories can be added for a component by creating an `index.stories.tsx` file within its directory.
Check `src/components/PolicyWidget/index.stories.tsx` for an example.
The component being used must be available as a named export for the prop type information to be generated as expected.

You can run storybook with:

``$ yarn storybook``

## Types

This app uses types defined in [`customer-service`](https://github.com/datamattersltd/customer-service) which are made available as an NPM package [@datamatters/types-customer-service](https://www.npmjs.com/package/@datamatters/types-customer-service). To update to the latest version run:

`$ yarn upgrade @datamatters/types-customer-service --latest`
