# TerribleOceanMissiles [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to use `yarn`
Simply use `yarn` wherever you would normally use `npm`... (e.g. `yarn add somepackage`)
A fast, reliable and secure dependency management package, sometimes better than NPM itself!
More information and docs [here](https://yarnpkg.com/lang/en/)

## How to use `commitizen`
Simply run `yarn commit` and follow the prompts, this should be done for every commit
Every commit with commitizen should follow the standard model: `commitType(targetOfChange): shortDescription`
Currently, `husky` has not been enabled, but please utilise commitizen...
### WARNING: if you do not use `yarn commit`, this repo may reject your commits!

## How to use `semantic-ui-react`
Semantic UI is a great source of extra components and themes, without having to spend a whole lot of time setting up boilerplate and writing CSS
To use Semantic UIs components in this repo, please see their [docs](https://react.semantic-ui.com)
To override style or set themes, please view the themes config in `src/semantic-ui/theme.config` and the overrides in `src/semantic-ui/site`
Theming documentation: https://react.semantic-ui.com/theming/

## Custom Scripts
|`yarn <command>`|Description|
|----------------|-----------|
|`db`|Starts the database daemon separately by running `mongod`|
|`dev`|Starts both `client` and `server` using the `concurrently` package. Requires `db` to be running in order to start.|
|`client`|Starts the React App Client on it's own| 
|`server`|Starts the Express API Server on it's own|
|`commit`|Runs commitizen to assist you in setting up standard commenting for your commits.<br><br>**This is highly recommended to prevent getting your commits from being rejected when pushing your changes due to bad commit messages.**|

## Default Scripts
|`yarn <command>`|Description|
|----------------|-----------|
|`build`|Build the app for prod in the `build` folder|
|`test`|Run all unit tests|
|`eject`|Eject from React Scripts. Not recommended to use unless you aren't satisfied with the build tools and config choices.<br>**Note: this is a one-way operation. Once you `eject`, you can’t go back!**|

## About Packages used in this Repo
|Package Name|Description|
|------------|-----------|
|`aws-sdk`|The AWS SDK used for uploading images to S3 bucket|
|`bcrypt`|The password hashing package! Secure and reliable|
|`body-parser`|URL encoding and JSON creation from API requests|
|`cors`|CORS - cross origin resource sharing will allow requests across different origins (domains)|
|`date-fns`|Date package, specifically use the formatDistance function to show post date (e.g. 5 min ago)|
|`dotenv`|Environment file management to pass environment variables to javascript functions|
|`history`|History allows for artificial browser history to push between pages without reloading|
|`jsonwebtoken`|JWT Token management, core authentication method used in this application, sign and verify JWT|
|`lodash`|Javascript utilities, specifically use lodash.times to render multiple components in a loop|
|`mongodb`|Core database software, MongoDB is a fast and secure no-sql database, collections for users and images|
|`multiparty`|Parse http requests with content-type multipart/form-data, also known as file uploads, very useful!|
|`react`|Core framework for this application, React is a declarative component based library for developing UIs|
|`react-redux`|Official React bindings for Redux|
|`redux`|Core state container and manager, allows for easy management of a web app|
|`redux-thunk`|Middleware for writing action creators, careful management of the dispatch of actions|
|`semantic-ui-react`|Official React integration for semantic-ui, declarative, jQuery free, augmented language|
|`craco`|CRACO - create react app configuration override, allows for standard CRA commands to be overriden (no need no eject, yay!)|
|`semantic-ui-less`|Official LESS/CSS integration. LESS is a preprocessor that compiles into CSS, used to override stylesheets|
|`concurrently`|Allows for node applications to be run simultaneously using one command (e.g. the web app and the API)|

## Branching Strategy
A simple take on the [Azure DevOps strategy](https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops)
This includes branches for `fix/*`, `feat/*`, `hotfix/*` and `project/*`
Branch type should be decided based on the scope of the task(s)

## StyleCI
This project has StyleCI enabled. Upon every pushed commit StyleCI will ensure that your code follows all rules set for the repository. If it detects any code that breaks the styling rules, it will create a new branch, make the required changes to correct the styling issues, and then send a pull request. Please review this PR and merge it if you find no issues.

The following are the rules StyleCI will check against:
- tab-width: 4
- use-tabs: false
- print-width: 120
- double-quotes: false
- trailing-commas: es5
- semicolons: true
- arrow-parens: avoid
- bracket-spacing: true

## Password Validation 
https://upmostly.com/tutorials/build-a-password-strength-meter-react
https://github.com/dropbox/zxcvbn
zxcvbn is a low budget password strength estimator, the implementation of this package enables higher secuirty, flexibilty and usability. The package takes into account common names and words, as well as keyboard patterns.
Passwords are reated as followed. Our password strength allowed is ranked as anything equal or higher than 2.  
- 0 # too guessable: risky password. (guesses < 10^3)
- 1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
- 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
- 3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
- 4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)

## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
