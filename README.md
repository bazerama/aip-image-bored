# TerribleOceanMissiles [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is [Commitizen friendly](http://commitizen.github.io/cz-cli/)

## How to use `yarn`
Simply use `yarn` wherever you would normally use `npm`... (e.g. `yarn add somepackage`)
A fast, reliable and secure dependency management package, often known as "the better NPM"
More information and docs [here](https://yarnpkg.com/lang/en/)

## How to use `commitizen`
Simply run `yarn commit` and follow the prompts, this should be done for every commit
### WARNING: if you do not use `yarn commit`, this repo may reject your commits! (and waste your time)

## How to use `semantic-ui-react`
Semantic UI is a great source of extra components and themes, without having to spend a whole lot of time setting up boilerplate and writing CSS
To use Semantic UIs components in this repo, please see their [docs](https://react.semantic-ui.com)

## Custom Scripts
|`yarn <command>`|Description|
|----------------|-----------|
|`dev`|Starts both `client` and `server` using the `concurrently` package|
|`client`|Starts the React App Client on it's own| 
|`server`|Starts the Express API Server on it's own|
|`commit`|Runs commitizen to assist you in setting up standard commenting for your commits.<br><br>**This is highly recommended to prevent getting your commits from being rejected when pushing your changes due to your commit messages.**|

## Default Scripts
|`yarn <command>`|Description|
|----------------|-----------|
|`build`|Build the app for prod in the `build` folder|
|`test`|Run all unit tests|
|`eject`|Eject from React Scripts. Not recommended to use unless you aren't satisfied with the build tools and config choices.<br>**Note: this is a one-way operation. Once you `eject`, you can’t go back!**|

## Coding Style Points
- Prettier: should be used at all times, called as part of commit hook along with Husky
    - Currently, the only prettier setting is `tabwidth=4`, will experiment with more features
- Husky: ensures that commit messages with Conventional Commit's guidelines (almost as important as good code!)
- Commitizen: an easy cli interface for commiting, follow conventional commit's standards too
- File locations: all components -> src/components, all stylesheets -> src/stylesheets and all api calls -> api/server.js
- File endings: all React components should be .jsx to indicate which files contain HTML/components to be rendered
- Module imports: when importing modules, consumers must ensure they are not adding excess complexity or weight
    - Also, imports MUST include file extension and DO NOT import multiple times, additionally, users should avoid using `import * as x from y`
- File exports: many files will have their own exports, this should be expressed in one of two ways:- (do not use default)
    - `export class LoginPage extends Component {`
    - `const LoginPage = ({ loggedIn }) => {` ... `export LoginPage`
- Mutable file export: exported variables should not be mutated outside module initialisation
    - alternatives include exporting a constant reference to an object that has mutable fields or exporting accessor functions for mutable data
- Spacing: around operators, around colons (in most cirumstances, including conditional rendering), around braces, DO NOT place before commas
- Line breaks: each statement should get a newline (unless extremely short and easy to read)
- Braces: place braces on newline for function definitions only, keep after class/object definition
- Variable declaration: one per line, split over newlines
- Key-value Objects: should have newline for each key-value pair, quotes around string values, brackets on newlines at start and end
- Props: should be camel cased with lowercase first letter, omit value when prop is explicitly true
- Refs: always use callbacks!

## Branching Strategy
### WIP
possibly this: https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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

